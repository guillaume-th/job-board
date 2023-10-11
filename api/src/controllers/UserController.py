from datetime import datetime
from sqlalchemy import and_
import bcrypt

from schema.UpdateUserSchema import UpdateUserSchema
from models.User import User
from connect import db


class UserController():
    def __init__(self):
        return

    def get_all(self):
        users = db.session.query(User).order_by(User.username).all()

        return users

    def get(self, id):
        user = db.session.query(User).where(User.id == id).one_or_none()

        return user

    def auth(self, data):
        user = db.session.query(User).where(
            User.email == data.get("email")).one_or_none()

        if not user:
            raise Exception(f"User with email [{data['email']}] not found")

        encoded_pass = bytes(data.get("password"), "utf-8")
        if bcrypt.checkpw(encoded_pass, user.password.encode("utf-8")):
            return user
        else:
            raise Exception(f"Invalid password")

    def create(self, data):
        password = bytes(data["password"],  encoding="utf-8")
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password, salt)

        data["password"] = hashed

        user_exists = db.session.query(User).where(
            User.email == data["email"]).one_or_none()

        if user_exists:
            raise Exception(f"User with email: {data['email']} already exists")

        user = User(**data)

        db.session.add(user)
        db.session.commit()

        return user

    def update(self, id, data):
        user = db.session.query(User).where(User.id == id).one_or_none()

        if not user:
            raise Exception(f"Invalid user with id [{id}]")

        if data.get("password"):
            salt = bcrypt.gensalt()
            hashed = bcrypt.hashpw(data["password"], salt)
            user.password = hashed

        for key, value in data.items():
            setattr(user, key, value)

        user.updated_at = datetime.now()

        db.session.commit()

        return user

    def delete(self, id):
        user = db.session.query(User).where(User.id == id).one_or_none()

        if not user:
            raise Exception(f"Invalid user with id [{id}]")

        db.session.delete(user)
        db.session.commit()
