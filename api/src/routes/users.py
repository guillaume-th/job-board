from flask import Blueprint, abort, jsonify, request
import bcrypt

from models.User import User
from connect import db

user_routes = Blueprint('user_routes', __name__)


@user_routes.route("/", methods=["GET", "POST", "DELETE"])
def get_users():
    try:
        if request.method == "GET":
            users = db.session.execute(
                db.select(User).order_by(User.username)).all()

            return users

        if request.method == "POST":
            data = request.get_json()
            password = bytes(data["password"],  encoding="utf-8")
            salt = bcrypt.gensalt()
            hashed = bcrypt.hashpw(password, salt)
            print(salt)
            data["password"] = hashed
            user = User(**data)
            return user
    except Exception as e:
        abort(jsonify(message=f"Error on user route: {e}", error=True))


@user_routes.route("/<int:id>", methods=["GET"])
def get_user(id: int):
    try:
        user = db.session.execute(
            db.select(User).get(id))

        return user
    except Exception as e:
        abort(jsonify(message=f"Error on user route: {e}", error=True))
