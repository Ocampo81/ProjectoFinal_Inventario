"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import app

api = Blueprint('api', __name__)

# Allow CORS requests to this API
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
    #  print("data dentro de Signup1",data)
     respuesta = app.Signup(data)
     return jsonify({"Message" : respuesta}),200

@api.route('/login', methods=['POST'])
def Login1():
     data = request.json
     respuesta = app.Login(data)
     print(respuesta)
     return jsonify({"Message" : respuesta}),200

# Endpoint Customer
@api.route('/customer', methods=['POST'])
def addCustomer1():
     data = request.json
     respuesta = app.addCustomer(data)
     print(respuesta)
     return jsonify({"Message" : respuesta}),200

@api.route('/customer/<int:nit>', methods=['DELETE'])
def delCustomer1(nit):
     # data = request.json
     respuesta = app.delCustomer(nit)
     print(respuesta)
     return jsonify({"Message" : respuesta}),200

@api.route('/customer/<int:nit>', methods=['GET'])
def getOneCustomer1(nit):
     respuesta = app.getOneCustomer(nit)
     # print("respuesta en route", type(respuesta), respuesta)
     return  jsonify(respuesta),200 

@api.route('/customer', methods=['GET'])
def getCustomer1():
     # respuesta = app.getCustomer()
     respuesta = app.getCustomer()
     # print("respuesta en route", type(respuesta), respuesta)
     return  jsonify(respuesta),200 

#Endponit Provider


# EndPoint Products
@api.route('/products', methods=['POST'])
def addProducts1():
     data = request.json
     respuesta = app.addProducts(data)
     print(respuesta)
     return jsonify({"Message" : respuesta}),200

@api.route('/products', methods=['GET'])
def getProducts():
     respuesta = app.getProducts()
     #respuesta =  {"message": "NADA DNADA "}
     # print("respuesta en route", type(respuesta), respuesta)
     return  jsonify(respuesta),200 

@api.route('/products/<int:id>', methods=['GET'])
def getOneProducts1(id):
     respuesta = app.getOneProducts(id)
     # print("respuesta en route", type(respuesta), respuesta)
     return  jsonify(respuesta),200 


# Endponit Category
@api.route('/category', methods=['POST'])
def addCategoryProduct():
     data = request.json
     respuesta = app.addCategoryProduct(data)
     print(respuesta)
     return jsonify({"Message" : respuesta}),200

# Endponit Sales
@api.route('/sales', methods=['POST'])
def addSales():
     data = request.json
     print("DATA", data)
     respuesta = app.addSales(data)
     print(respuesta)
     return jsonify({"Message" : respuesta}),200


# Endponit DetailSales
@api.route('/detailsales', methods=['POST'])
def addDetailSales():
     data = request.json
     print("DATA", data)
     respuesta = app.addDetailSales(data)
     print(respuesta)
     return jsonify({"Message" : respuesta}),200


@api.route('/sales/<int:idsales>', methods=['GET'])
def getOneSales(idsales):
     respuesta = app.getOneSales(idsales)
     # print("respuesta en route", type(respuesta), respuesta)
     return  jsonify(respuesta),200 


# ******   Endpoint prueba

@api.route('/customerotro', methods=['GET'])
def getCustomerOtro1():
     # respuesta = app.getCustomer()
     respuesta = app.getCustomerOtro()
     # print("respuesta en route", type(respuesta), respuesta)
     return  jsonify(respuesta),200 



@api.route('/provider', methods=['POST'])
def addprovider1():
     data = request.json
     respuesta = app.addProvider(data)
     print(respuesta)
     return jsonify({"Message" : respuesta}),200