from datetime import datetime
from controllers.UserController import UserController
from models.Company import Company
from connect import db


class CompanyController():

    def __init__(self) -> None:
        pass

    def get_all(self, _params):
        company = db.session.query(Company).all()
        return company

    def get(self, id):
        company = db.session.query(Company).filter(
            Company.id == id).one_or_none()
        return company

    def create(self, data):
        data["users"] = UserController().get_from_ids(data.get("users", []))

        company = Company(**data)
        return company

    def update(self, data, id):
        data["users"] = UserController().get_from_ids(data.get('users', []))
        company = self.get(id)

        for key, value in data.items():
            setattr(company, key, value)

        company.updated_at = datetime.now()

        return company
