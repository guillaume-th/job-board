from datetime import datetime
from typing import List
import bcrypt

from models.Skill import Skill
from connect import db


class SkillController():
    def __init__(self):
        pass

    def get_all(self):
        skills = db.session.query(Skill).all()

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

    def get_from_ids(self, ids: List[int]):
        return db.session.query(Skill).filter(
            Skill.id.in_(ids)).all()
