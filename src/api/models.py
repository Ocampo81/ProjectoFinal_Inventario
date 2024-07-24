from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    lastName = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    profile = db.Column(db.String(20), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' %self.email

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "lastName": self.lastName,
            "is_active": self.is_active,
            "profile": self.profile
            # do not serialize the password, its a security breach
        } 
    

class Provider(db.Model):
    __tablename__ = 'provider'
    nit = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(60), nullable=False)
    id = db.Column(db.Integer, db.ForeignKey('user.id'))
    id = db.Column(db.Integer, db.ForeignKey('address.id'))

    def __repr__(self):
        return '<Objective %r>' %self.nit

    def serialize(self):
        return {
            "Id_objective": self.nit,
            "Name": self.phone
            # do not serialize the password, its a security breach
        }
    
class Customer(db.Model):
    __tablename__ = 'customer'
    nit = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(60), nullable=False)
    date = db.Column(db.String(15), nullable=False)
    id = db.Column(db.Integer, db.ForeignKey('user.id'))
    id = db.Column(db.Integer, db.ForeignKey('address.id'))

    def __repr__(self):
        return '<Objective %r>' %self.nit

    def serialize(self):
        addr = Address
        return {
            "nit": self.nit,
            "phone": self.phone,
            "date": self.date,
            #prueba que valores devuelve
            "city": addr.city,
            "address": addr.address,
            "country": addr.country

            # do not serialize the password, its a security breach
        }
    
class Address(db.Model):
    __tablename__ = 'address'
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(60), nullable=False)
    city = db.Column(db.String(60), nullable=False)
    country = db.Column(db.String(60), nullable=False)
    # nit = db.Column(db.Integer, db.ForeignKey('customer.nit'))

    def __repr__(self):
        return '<Objective %r>' %self.id

    def serialize(self):
        return {
            "id": self.id,
            "address": self.address,
            "city": self.city,
            "address": self.country
            # do not serialize the password, its a security breach
        }



class Sales(db.Model):
    __tablename__ = 'sales'    
    idSales = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(15), nullable=False) 
    totalPrice = db.Column(db.Integer, nullable=False)
    id = db.Column(db.Integer, db.ForeignKey('user.id'))
    nit = db.Column(db.Integer, db.ForeignKey('customer.nit'))

    def __repr__(self):
        return '<Member %r>' %self.id

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            "totalPrice": self.totalPrice,
            "nit": self.nit

            # do not serialize the password, its a security breach
        }  

class DetailSales(db.Model):
    __tablename__ = 'detailsales'    
    id = db.Column(db.Integer, primary_key=True)
    amount  = db.Column(db.Integer, nullable=False) 
    unitPrice  = db.Column(db.Integer, nullable=False)
    idSales = db.Column(db.Integer, db.ForeignKey('sales.idSales'))

    def __repr__(self):
        return '<Member %r>' %self.id_member

    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "unitPrice": self.unitPrice
            # do not serialize the password, its a security breach
        }
    
class Products(db.Model):
        
    __tablename__ = 'products'    
    id_prod = db.Column(db.Integer, primary_key=True)
    prodname = db.Column(db.String(60), nullable=False) 
    salesPrice = db.Column(db.Integer, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    idCatProd = db.Column(db.Integer, db.ForeignKey('categoryproduct.idCatProd'))

    def __repr__(self):
        return '<Member %r>' %self.id_prod

    def serialize(self):
        return {
            "id": self.id_prod,
            "prodName": self.prodname,
            "salesPrice": self.salesPrice,
            "stock": self.stock

            # do not serialize the password, its a security breach
        }  

class CategoryProduct(db.Model):
    __tablename__ = 'categoryproduct'    
    idCatProd = db.Column(db.Integer, primary_key=True)
    category  = db.Column(db.String(50), nullable=False) 
    description  = db.Column(db.String(200), nullable=False)


    def __repr__(self):
        return '<Member %r>' %self.idCatProd

    def serialize(self):
        return {
            "id": self.idCatProd,
            "category": self.category,
            "description": self.description

            # do not serialize the password, its a security breach
        }