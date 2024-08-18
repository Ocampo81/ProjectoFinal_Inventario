from flask import Flask, request, jsonify, Blueprint
from api.models import db
import app

api = Blueprint('api', __name__)

# Allow CORS requests to this API
from flask_cors import CORS
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def Signup1():
    data = request.json
    respuesta = app.Signup(data)
    return jsonify({"Message": respuesta}), 200

@api.route('/login', methods=['POST'])
def Login1():
    data = request.json
    respuesta = app.Login(data)
    return jsonify({"Message": respuesta}), 200

# Endpoint Customer
@api.route('/customer', methods=['POST'])
def addCustomer1():
    data = request.json
    respuesta = app.addCustomer(data)
    return jsonify({"Message": respuesta}), 200

@api.route('/customer/<int:nit>', methods=['DELETE'])
def delCustomer1(nit):
    respuesta = app.delCustomer(nit)
    return jsonify({"Message": respuesta}), 200

@api.route('/customer/<int:nit>', methods=['GET'])
def getOneCustomer1(nit):
    respuesta = app.getOneCustomer(nit)
    return jsonify(respuesta), 200

@api.route('/customerid/<int:userId>', methods=['GET'])
def getOneCustomerID(userId):
    respuesta = app.getOneCustomerID(userId)
    return jsonify(respuesta), 200


@api.route('/customer', methods=['GET'])
def getCustomer1():
    respuesta = app.getCustomer()
    return jsonify(respuesta), 200

# EndPoint Products
@api.route('/products', methods=['POST'])
def addProducts1():
    data = request.json
    respuesta = app.addProducts(data)
    return jsonify({"Message": respuesta}), 200

@api.route('/products', methods=['GET'])
def getProducts():
    respuesta = app.getProducts()
    return jsonify(respuesta), 200

@api.route('/products/<int:id>', methods=['GET'])
def getOneProducts1(id):
    respuesta = app.getOneProducts(id)
    return jsonify(respuesta), 200

@api.route('/products/<int:id>', methods=['PUT'])
def updateProduct(id):
    data = request.json
    respuesta = app.updateProduct(id, data)
    return jsonify({"Message": respuesta}), 200


@api.route('/products/<int:id_prod>', methods=['DELETE'])
def delProducts(id_prod):
     print(id_prod)
     # data = request.json
     respuesta = app.delProducts(id_prod)
     print(respuesta)
     return jsonify({"Message" : respuesta}),200


# EndPoint Category
@api.route('/category', methods=['POST'])
def addCategoryProduct():
    data = request.json
    respuesta = app.addCategoryProduct(data)
    return jsonify({"Message": respuesta}), 200

@api.route('/categories', methods=['GET'])
def getCategories():
    respuesta = app.getCategories()
    return jsonify(respuesta), 200

# EndPoint Sales
@api.route('/sales', methods=['POST'])
def addSales():
    data = request.json
    respuesta = app.addSales(data)
    return jsonify({"Message": respuesta}), 200

# EndPoint DetailSales
@api.route('/detailsales', methods=['POST'])
def addDetailSales():
    data = request.json
    respuesta = app.addDetailSales(data)
    return jsonify({"Message": respuesta}), 200

@api.route('/sales/<int:idsales>', methods=['GET'])
def getOneSales(idsales):
    respuesta = app.getOneSales(idsales)
    return jsonify(respuesta), 200

@api.route('/sales/<int:idsales>', methods=['DELETE'])
def delSales(idsales):
     print(idsales)
     # data = request.json
     respuesta = app.delSales(idsales)
     print(respuesta)
     return jsonify({"Message" : respuesta}),200

@api.route('/salesNextid/', methods=['GET'])
def getNextId():
    respuesta = app.getNextId()
    return jsonify(respuesta), 200

# ******   Endpoint prueba

@api.route('/customerotro', methods=['GET'])
def getCustomerOtro1():
    respuesta = app.getCustomerOtro()
    return jsonify(respuesta), 200

@api.route('/provider', methods=['POST'])
def addProvider1():
    data = request.json
    respuesta = app.addProvider(data)
    return jsonify({"Message": respuesta}), 200
