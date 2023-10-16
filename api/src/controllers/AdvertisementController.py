from models.Advertisement import Advertisement
from schema.AdvertisementSchema import AdvertisementSchema
from connect import db

from controllers.CompanyController import CompanyController
from controllers.UserController import UserController
from controllers.SkillController import SkillController


class AdvertisementController():

    def __init__(self) -> None:
        pass

    def get_all(self, params=None):
        my_list = []
        for i in params.keys():
            if not AdvertisementSchema().validate(data={i: params[i]}, partial=True):
                my_list.append(getattr(Advertisement, i).like(
                    "%"+params[i].lower()+"%"))
        advertisement = db.session.query(Advertisement).filter(*my_list).all()

        return advertisement

    def get(self, id):
        advertisement = db.session.query(Advertisement).where(
            Advertisement.id == id).one_or_none()

        return advertisement

    def create(self, data):
        data["skills"] = SkillController().get_from_ids(data.get("skills", []))
        company = CompanyController().get(data["company_id"])
        recruiter = UserController().get(data["recruiter_id"])

        advertisement = Advertisement(**data)

        advertisement.company = company
        advertisement.recruiter = recruiter

        return advertisement

    def update(self, data, id):
        data["skills"] = SkillController().get_from_ids(data.get("skills", []))
        advertisement = self.get(id)

        for key, value in data.items():
            setattr(advertisement, key, value)

        advertisement.updated_at = datetime.now()

        return advertisement
