from models.Advertisement import Advertisement
from connect import db
from controllers.CompanyController import CompanyController
from controllers.UserController import UserController

class AdvertisementController():

    def __init__(self) -> None:
        pass

    def get_all(self,params=None):
        advertisement = db.session.query(Advertisement).order_by(params).all()
        return advertisement
    def get(self,id):
        advertisement = db.session.query(Advertisement).where(Advertisement.id == id).one_or_none()
        return advertisement
    
    def create (self,data):
        company = CompanyController().get(data["company_id"])
        recruiter = UserController().get(data["recruiter_id"])
        advertisement = Advertisement(**data)
        advertisement.company = company
        advertisement.recruiter = recruiter
        return advertisement
    def update(self,data,id):
        advertisement = db.session.query(Advertisement).filter(Advertisement.id == id).update(data)
        return advertisement
