from flask import Blueprint, abort, jsonify, request

from schema.CreateUserSchema import CreateUserSchema

from controllers.UserController import UserController

user_routes = Blueprint('user_routes', __name__)


@user_routes.route("/", methods=["GET", "POST", "DELETE"])
def users():
    try:
        if request.method == "GET":
            return UserController().get_all()

        if request.method == "POST":
            schema = CreateUserSchema()
            data = schema.load(request.get_json()).data

            return UserController().create(data)
    except Exception as e:
        abort(jsonify(message=f"Error on user route: {e}", error=True))


@user_routes.route("/<int:id>", methods=["GET"])
def user(id: int):
    try:
        return UserController().get(id)
    except Exception as e:
        abort(jsonify(message=f"Error on user route: {e}", error=True))
