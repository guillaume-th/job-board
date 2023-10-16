from datetime import datetime
from typing import List
import bcrypt

from models.User import User
from controllers.SkillController import SkillController
from connect import db


class UserController():
    def __init__(self):
        return

    def get_all(self):
        users = db.session.query(User).all()

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

        if data.get("skills"):
            del data["skills"]

        user = User(**data)

        for skill_id in data.get("skills", []):
            skill = SkillController.get(skill_id)
            print(skill)
            user.append(skill)

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
            if key not in ["skills"]:
                setattr(user, key, value)

        user.updated_at = datetime.now()

        for skill_id in data.get("skills", []):
            user.append(SkillController.get(skill_id))

        db.session.commit()

        return user

    def delete(self, id):
        user = db.session.query(User).where(User.id == id).one_or_none()

        if not user:
            raise Exception(f"Invalid user with id [{id}]")

        db.session.delete(user)
        db.session.commit()

    def get_from_ids(self, ids: List[int]):
        return db.session.query(User).filter(
            User.id.in_(ids)).all()
