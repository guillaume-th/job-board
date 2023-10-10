from flask import Blueprint, abort, jsonify, request

from schema.UserSchema import UserSchema
from schema.UpdateUserSchema import UpdateUserSchema
from schema.CreateUserSchema import CreateUserSchema

from controllers.UserController import UserController

user_routes = Blueprint('user_routes', __name__)


@user_routes.route("/", methods=["GET", "POST"])
def users():
    try:
        if request.method == "GET":
            schema = UserSchema(many=True)
            users = UserController().get_all()

            response = schema.dump(users)

            return response

        if request.method == "POST":
            schema = CreateUserSchema()
            data = schema.load(request.get_json())
            user = UserController().create(data)

            return UserSchema().dump(user)

    except Exception as e:
        abort(jsonify(message=f"Error on user route: {e}", error=True))


@user_routes.route("/<int:id>", methods=["GET", "PUT", "DELETE"])
def user(id: int):
    try:
        user_controller = UserController()
        if request.method == "GET":
            user = user_controller.get(id)
            return UserSchema().dump(user)

        if request.method == "PUT":
            schema = UpdateUserSchema()
            data = schema.load(request.get_json())
            user = user_controller.update(id, data)

            return UserSchema().dump(user)

        if request.method == "DELETE":
            user_controller.delete(id)
            return {"error": False}

    except Exception as e:
        abort(jsonify(message=f"Error on user route: {e}", error=True))
