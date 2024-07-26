"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
from datetime import datetime


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
    # print("DATA DATA :", data.get("email"),'\n', data.get("password"), '\n', data.get("name"), '\n',  data.get("lastname"))
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









@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
