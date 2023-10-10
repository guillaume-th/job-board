from models.Company import Company
from connect import db

class CompanyController():

    def __init__(self) -> None:
        pass

    def get_all(self,params=None):
        company = db.session.execute(
        db.select(Company).order_by(params)).all()
        return company
    def get(self,id):
        company = db.session.query(Company).filter(Company.id == id).one_or_none()
        return company
    def create (self,data):
        company = Company(**data)
        return company
    def update(self,data,id):
        company = db.session.query(Company).filter(Company.id == id).update(**data)
        return company
