from flask import Blueprint, abort, jsonify, request

from schema.UserSchema import UserSchema
from schema.CreateUserSchema import CreateUserSchema

from controllers.UserController import UserController

user_routes = Blueprint('user_routes', __name__)


@user_routes.route("/", methods=["GET", "POST", "DELETE"])
def users():
    try:
        if request.method == "GET":
            schema = UserSchema(many=True)
            users = UserController().get_all()
            print(schema, users)
            response = schema.dump(users)

            return response

        if request.method == "POST":
            schema = CreateUserSchema()
            data = schema.load(request.get_json())
            user = UserController().create(data)

            return user

    except Exception as e:
        abort(jsonify(message=f"Error on user route: {e}", error=True))


@user_routes.route("/<int:id>", methods=["GET"])
def user(id: int):
    try:
        return UserController().get(id)
    except Exception as e:
        abort(jsonify(message=f"Error on user route: {e}", error=True))
