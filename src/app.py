"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, Customer, Address, Provider, Products, CategoryProduct, Sales, DetailSales
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from datetime import datetime
from sqlalchemy.orm import relationship, join, sessionmaker
from sqlalchemy import create_engine, engine, join, and_, or_
import json


# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)


#se inicia JWT
#app.config["JWT_SECRET_KEY"] = secrets.token_urlsafe(32) # Generate a 32-character URL-safe string
jwt = JWTManager(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file

#Función para realizar Signup devuelve mensaje
def Signup(data):
    #data = request.json
    print("DATA DATA en APP SIN *****:", data)
    print("DATA DATA en APP:", data.get("email"),'\n', data.get("password"), '\n', data.get("name"), '\n',  data.get("lastname"))
    newUser = User()
    newUser.email = data.get("email")
    newUser.name = data.get("name")
    newUser.lastName = data.get("lastname")
    newUser.password = data.get("password")
    newUser.is_active = data.get("is_active")
    newUser.profile = data.get("profile")
    if newUser.email == "" or newUser.password == "" :
        response_body = {"message": "email and password are required"}
        return response_body
    else:
        user_result = db.session.execute(db.select(User).filter_by(email=newUser.email)).one_or_none()
        if user_result != None and user_result[0].email == newUser.email:
            response_body = {"message": "user already exists"}
            return response_body
        else:
            db.session.add(newUser)
            db.session.commit()
            response_body = {"message": "User created successfully"}
            return response_body

#Función para realizar Login devuelve token, Id, email
def Login(data):
    newUser = User()
    print("Newuser dentro de Login",data.get("email"), data.get("password"))
    newUser.email = data.get("email")
    newUser.password = data.get("password")

    if newUser.email == "" or newUser.password == "" :
        response_body = {"Error": "email and password are required"}
        return response_body
    else:
        user_result = db.session.execute(db.select(User).filter_by(email=data.get("email"))).one_or_none()
        if user_result == None:
            response_body = {"Error": "user doesn't exist please create user first"}
            return response_body
        else:
            user_result = user_result[0]
            print("Newuser PASSWORD",user_result.password, newUser.password, "ID es: ", user_result.id)
            passwd_is_ok = user_result.password == newUser.password
            if not passwd_is_ok:
                response_body = {"Error": "Password incorrect",}
                return response_body
            token = create_access_token(identity=user_result.id)
            response_body = {"token": token,
                            "id": user_result.id,
                            "email": user_result.email
                            }
            return response_body

#Funciones para Customers

def addCustomer(data):
    newCustomer = Customer()
    newAddr = Address()
    newCustomer.nit = data.get("nit")
    newCustomer.phone = data.get("phone")
    newCustomer.date = data.get("date")
    newCustomer.idUser = data.get("idUser")
    newCustomer.addrNit = data.get("nit")

    # newAddr.id = data.get("id")
    newAddr.nit = data.get("nit")
    newAddr.address = data.get("address")
    newAddr.city = data.get("city")
    newAddr.country = data.get("country")
    
    if newCustomer.nit == "" :
        response_body = {"message": "Nit required"}
        return response_body
    else:
        user_result = db.session.execute(db.select(Customer).filter_by(nit=newCustomer.nit)).one_or_none()
        if user_result != None and user_result[0].nit == newCustomer.nit:
            response_body = {"message": "Customer already exists"}
            return response_body
        else:
            db.session.add(newCustomer)
            db.session.commit()
            db.session.add(newAddr)
            db.session.commit()
            response_body = {"message": "Customer created successfully"}
            return response_body

def delCustomer(data):
    delnit = db.session.execute(db.select(Customer).filter_by(nit=data)).one_or_none()
    
    if delnit != None:
        delnit = Customer.query.filter_by(nit=data).one()
        db.session.delete(delnit)
        db.session.commit()
        response_body = {"message": "Customer deleted successfully"}
        return response_body
    else:
        response_body = {"message": "Customer not found", "nit": data}
        return response_body

def getCustomer():
    customerList=[]
    query = db.select(Customer.nit,Customer.phone,Customer.date, Address.address,Address.country,Address.city).join(Address, Customer.nit == Address.nit)
    result = db.session.execute(query)

    for customer in result.fetchall():
        customerList.append(dict(customer._mapping))

    return tuple(customerList)


def getOneCustomer(data):
    customerList=[]
    query = db.select(Customer.nit,Customer.phone,Customer.date, Address.address,Address.country,Address.city).join(Address, Customer.nit == Address.nit).filter_by(nit=data)
    result = db.session.execute(query)

    for customer in result.fetchall():
        print(dict(customer._mapping))
        customerList.append(dict(customer._mapping))

    return tuple(customerList)

# Funciones para Providers

def addProvider(data):
    newProvider = Provider()
    newAddr = Address()
    newProvider.nit = data.get("nit")
    newProvider.phone = data.get("phone")
    #newProvider.date = data.get("date")
    newProvider.idUser = data.get("idUser")
    #newProvider.addrNit = data.get("nit")

    # newAddr.id = data.get("id")
    newAddr.nit = data.get("nit")
    newAddr.address = data.get("address")
    newAddr.city = data.get("city")
    newAddr.country = data.get("country")
    
    if newProvider.nit == "" :
        response_body = {"message": "Nit required"}
        return response_body
    else:
        user_result = db.session.execute(db.select(Customer).filter_by(nit=newProvider.nit)).one_or_none()
        if user_result != None and user_result[0].nit == newProvider.nit:
            response_body = {"message": "Customer already exists"}
            return response_body
        else:
            db.session.add(newProvider)
            db.session.commit()
            db.session.add(newAddr)
            db.session.commit()
            response_body = {"message": "Customer created successfully"}
            return response_body

# Functions for Products

def addProducts(data):
    newProducts = Products()
    # newCatProd = CategoryProduct()

    newProducts.id_prod = data.get("id_prod")
    newProducts.prodname = data.get("prodname").upper()
    newProducts.brand = data.get("brand").upper()
    newProducts.salesPrice = data.get("salesPrice")
    newProducts.stock = data.get("stock")
    newProducts.idCatProd = data.get("idCatProd")
    

    if newProducts.id_prod == "" :
        response_body = {"message": "Id producto es requerido"}
        return response_body
    else:
        Category_result = db.session.execute(db.select(CategoryProduct).filter_by(idCatProd=newProducts.idCatProd)).one_or_none()
        if Category_result == None:
            response_body = {"message": "Category doesn't exists"}
            return response_body
        else:
            Product_result = db.session.execute(db.select(Products).filter_by(id_prod=newProducts.id_prod)).one_or_none()
            if Product_result != None and Product_result[0].id_prod == newProducts.id_prod:
                response_body = {"message": "PRODUCT already exists"}
                return response_body
            else:
    
                db.session.add(newProducts)
                db.session.commit()
                
                response_body = {"message": "PRODUCT created successfully"}
                return response_body

def getProducts():
    productsList=[]
    # query = db.select(Customer.nit,Customer.phone,Customer.date, Address.address,Address.country,Address.city).join(Address, Customer.nit == Address.nit)
    query = db.select(Products.id_prod,Products.prodname,Products.brand, Products.salesPrice, Products.stock, Products.Catproducts, CategoryProduct.category,CategoryProduct.description).join(CategoryProduct, Products.idCatProd == CategoryProduct.idCatProd)
    result = db.session.execute(query)

    for products in result.fetchall():
        print("GETPRODUCTS: ", products._mapping)
        productsList.append(dict(products._mapping))

    return tuple(productsList)

def getOneProducts(data):
    productsList=[]
    query = db.select(Products.id_prod,Products.prodname,Products.brand, Products.salesPrice, Products.stock, Products.Catproducts, CategoryProduct.category,CategoryProduct.description).filter_by(id_prod=data).join(CategoryProduct, Products.idCatProd == CategoryProduct.idCatProd)
    result = db.session.execute(query)

    for products in result.fetchall():
        print(products._mapping, type())
        productsList.append(dict(products._mapping))

    return tuple(productsList)

def delProducts(data):
    delIdProd = db.session.execute(db.select(Products).filter_by(id_prod=data)).one_or_none()
    
    if delIdProd != None:
        delIdProd = Products.query.filter_by(id_prod=data).one()
        db.session.delete(delIdProd)
        db.session.commit()
        response_body = {"message": "Products deleted successfully"}
        return response_body
    else:
        response_body = {"message": "Products not found", "nit": data}
        return response_body



# Functions for CategoryProduct

def addCategoryProduct(data):
 
    newCatProd = CategoryProduct()
   
    newCatProd.category = data.get("category").upper()
    newCatProd.description = data.get("description").upper()

    if newCatProd.category == "" :
        response_body = {"message": "Category is necesary"}
        return response_body
    else:
        Category_result = db.session.execute(db.select(CategoryProduct).filter_by(category=newCatProd.category)).one_or_none()
        if Category_result != None:
            response_body = {"message": "Category already exists"}
            return response_body
        else:
            db.session.add(newCatProd)
            db.session.commit()
            response_body = {"message": "Category created successfully"}
            return response_body
            



# Functions for Sales

def addSales(data):
 
    newSales = Sales()
  
    # Sales
    newSales.idSales  = data.get("idSales")
    newSales.iduser  = data.get("iduser")
    newSales.totalPrice  = data.get("totalPrice")
    newSales.nit  = data.get("nit")
    
    sales_exists = db.session.execute(db.select(Sales).filter_by(idSales=newSales.idSales)).one_or_none()
    if sales_exists == None:
        db.session.add(newSales)
        db.session.commit()
        response_body = addDetailSales(data)
        return response_body
    else:
        response_body = {"message": "Sales receipts alredy exists"}
        return response_body   
        
def getNextId():
     obj = db.session.query(Sales).order_by(Sales.idSales.desc()).first()
     nextId = obj.idSales + 1
    #  print("Nex ID: ",obj, type(obj.idSales), nextId+1) 
     response_body = {"ID": nextId}
     return response_body

def addDetailSales(data):
    newDtSales = DetailSales()
    print("DATA dentro de addDetailSales! ", data)
    # DetailSales
    newDtSales.amount  = data.get("amount")
    newDtSales.unitPrice =  data.get("unitPrice")
    newDtSales.idSales = data.get("idSales")
    newDtSales.id_prod  = data.get("id_prod") ### Verificar STOCK antes de la venta

    sales_exists = db.session.execute(db.select(Sales).filter_by(idSales=newDtSales.idSales)).one_or_none()
    if sales_exists == None:
        response_body = {"message": "Sales receipts not  exists"}
        return response_body
    else:
        stock_available = db.session.execute(db.select(Products.stock).filter((Products.id_prod == newDtSales.id_prod))).one_or_none()
        # Prueba ---> stock_available = db.session.execute(db.select(DetailSales.products.stock).filter((DetailSales.products.id_prod == newDtSales.id_prod))).one_or_none()
        print(stock_available[0], type(stock_available))
        if stock_available[0] >= int(newDtSales.amount) :
            newstock = stock_available[0] - int(newDtSales.amount)
            db.session.query(Products).filter(Products.id_prod == newDtSales.id_prod).update({Products.stock : newstock})
            
            db.session.add(newDtSales)
            db.session.commit()
            response_body = {"message": "Sales created successfully"}
            return response_body
        else:
            response_body = {"message": "Stock not available ", "Stock": stock_available[0] }
            return response_body


def getSales():
    customerList=[]
    # query = db.select(Sales.iduser, Sales.nit, DetailSales.amount, DetailSales.unitPrice, DetailSales.idSales, DetailSales.id_prod).join(Sales, Sales.idSales == DetailSales.idSales).filter_by(idSales=data)
    query = db.select(User.name, User.lastName, Products.prodname, Sales.iduser, Sales.nit, Sales.date, DetailSales.amount, DetailSales.unitPrice, DetailSales.idSales, DetailSales.id_prod).join(Sales, Sales.idSales == DetailSales.idSales)\
        .join(User, User.id == Sales.iduser)\
        .join(Products, Products.id_prod == DetailSales.id_prod)
    result = db.session.execute(query)

    for customer in result.fetchall():
        print(dict(customer._mapping))
        customerList.append(dict(customer._mapping))

    return tuple(customerList)

def getOneSales(data):
    customerList=[]
    # query = db.select(Sales.iduser, Sales.nit, DetailSales.amount, DetailSales.unitPrice, DetailSales.idSales, DetailSales.id_prod).join(Sales, Sales.idSales == DetailSales.idSales).filter_by(idSales=data)
    query = db.select(User.name, User.lastName, Products.prodname, Sales.iduser, Sales.nit, DetailSales.amount, DetailSales.unitPrice, DetailSales.idSales, DetailSales.id_prod).join(Sales, Sales.idSales == DetailSales.idSales)\
        .filter_by(idSales=data)\
        .join(User, User.id == Sales.iduser)\
        .join(Products, Products.id_prod == DetailSales.id_prod)
    result = db.session.execute(query)

    for customer in result.fetchall():
        print(dict(customer._mapping))
        customerList.append(dict(customer._mapping))

    return tuple(customerList)

def delSales(data):
    delSales = db.session.execute(db.select(Sales).filter_by(idSales=data)).one_or_none()
    
    if delSales != None:
        delSales = Sales.query.filter_by(idSales=data).one()
        db.session.delete(delSales)
        db.session.commit()
        response_body = {"message": "Sale deleted successfully"}
        return response_body
    else:
        response_body = {"message": "Sale not found", "ID": data}
        return response_body



######## 

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# **** PRUEBA *****
def getCustomerOtro():
    customerList=[] 
    query = db.session.query(Address).join(Customer, Address.nit == Customer.nit)
    query1 = db.session.query(Customer).join(Address, Customer.nit == Address.nit)
    print("query", query)

    print("query1 ", query1 )
    for customer in query1:
        print(customer.serialize(), customer.address[0].serialize())
        cust = customer.serialize()
        addr = customer.address[0].serialize()
        print(type(cust), type(addr))
        print(cust.items(), addr.values())
        print(cust.get('nit'), addr['city'])
        # # print("customer: ", customer, type(customer))
        # campo = customer[0].serialize()
        # campo1= customer[1].serialize()
        # print("campo: ", campo, campo1 )

        # print(campo.get("nit")) 
        #     #   campo[1], campo.phone, campo1[5])
        #     #   , campo1.city, campo1.address)
        # # print(customer.nit, customer.date, customer.phone, customer.addresses.country, customer.addresses.city, customer.addresses.address)
        # # customerList.append(campo)

    return None
# tuple(customerList)





# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
