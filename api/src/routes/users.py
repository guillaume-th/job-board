from flask import Blueprint, abort, jsonify

from models.User import User
from connect import db

user_routes = Blueprint('users', __name__)


@user_routes.route("/api/users", methods=["GET"])
def get_users():
    try:
        users = db.session.execute(
            db.select(User).order_by(User.username)).all()

        return users
    except Exception as e:
        abort(jsonify(message=f"Error on user route: {e}", error=True))
