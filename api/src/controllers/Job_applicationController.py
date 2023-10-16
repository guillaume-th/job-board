from models.JobApplication import JobApplication
from connect import db

class JobApplicationController():

    def __init__(self) -> None:
        pass

    def get_all(self,params=None):
        job_application = db.session.query(JobApplication).order_by(params).all()
        return job_application

    def get(self,id):
        job_application = db.session.query(JobApplication).filter(JobApplication.id == id).one_or_none()
        return job_application

    def create (self,data):
        job_application = JobApplication(**data)
        return job_application

    def update(self,data,id):
        job_application = db.session.query(JobApplication).filter(JobApplication.id == id).update(data)
        return job_application