from models.Industry import Industry
from connect import db

class IndustryController():

    def __init__(self) -> None:
        pass

    def get_all(self,params=None):
        industry = db.session.query(Industry).order_by(params).all()
        return industry
    
    def get(self,id):
        industry = db.session.query(Industry).filter(Industry.id == id).one_or_none()
        return industry
    
    def create (self,data):
        industry = Industry(**data)
        return industry
    
    def update(self,data,id):
        industry = db.session.query(Industry).filter(Industry.id == id).update(data)
        return industry
