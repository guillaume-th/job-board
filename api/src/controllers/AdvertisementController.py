from models.Advertisement import Advertisement
from connect import db

class AdvertisementController():

    def __init__(self) -> None:
        pass

    def get_all(self,params=None):
        advertisement = db.session.execute(
        db.select(Advertisement).order_by(params)).all()
        return advertisement
    def get(self,id):
        advertisement = db.session.query(Advertisement).filter(Advertisement.id == id).one_or_none()
        return advertisement
    def create (self,data):
        advertisement = Advertisement(**data)
        return advertisement
    def update(self,data,id):
        advertisement = db.session.query(Advertisement).filter(Advertisement.id == id).update(**data)
        return advertisement
