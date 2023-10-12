from datetime import datetime
import bcrypt

from models.Skill import Skill
from connect import db


class SkillController():
    def __init__(self):
        pass

    def get_all(self):
        skills = db.session.query(Skill).order_by(Skill.name).all()

        return skills

    def get(self, id):
        skill = db.session.query(Skill).where(Skill.id == id).one_or_none()

        return skill

    def create(self, data):
        skill_exists = db.session.query(Skill).where(
            Skill.name == data["name"]).one_or_none()

        if skill_exists:
            raise Exception(
                f"Skill with name: {data['name']} already exists")

        skill = Skill(**data)

        db.session.add(skill)
        db.session.commit()

        return skill

    def update(self, id, data):
        skill = db.session.query(Skill).where(Skill.id == id).one_or_none()

        if not skill:
            raise Exception(f"Invalid skill with id [{id}]")

        for key, value in data.items():
            setattr(skill, key, value)

        skill.updated_at = datetime.now()

        db.session.commit()

        return skill

    def delete(self, id):
        skill = db.session.query(Skill).where(Skill.id == id).one_or_none()

        if not skill:
            raise Exception(f"Invalid skill with id [{id}]")

        db.session.delete(skill)
        db.session.commit()
