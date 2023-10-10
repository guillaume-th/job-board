import bcrypt

from models.User import User
from connect import db


class UserController():
    def __init__(self):
        return

    def get_all(self):
        users = db.session.execute(
            db.select(User).order_by(User.username)).all()

        return users

    def get(self, id):
        user = db.session.execute(
            db.select(User).get(id))

        return user

    def create(self, data):
        password = bytes(data["password"],  encoding="utf-8")
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password, salt)

        data["password"] = hashed
        user = User(**data)

        db.session.add(user)
        db.session.commit()

        return user

    # def delete(self, id):
    #     user = db.session.
