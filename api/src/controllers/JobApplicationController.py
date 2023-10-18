from models.JobApplication import JobApplication
from controllers.MessageController import MessageController
from connect import db


class JobApplicationController():

    def __init__(self) -> None:
        pass

    def get_all(self, params=None):
        job_application = db.session.query(
            JobApplication).order_by(params).all()
        return job_application

    def get(self, id):
        job_application = db.session.query(JobApplication).filter(
            JobApplication.id == id).one_or_none()
        return job_application

    def create(self, data):
        job_application = JobApplication(**data)
        message = MessageController().create(
            {"content": data.get("candidate_text", ""), "author_id": data.get("candidate_id"),  "job_application": job_application})
        db.session.add(message)
        return job_application

    def update(self, data, id):
        if data.get("recruiter_id"):
            del data['recruiter_id']
        job_application = db.session.query(JobApplication).filter(
            JobApplication.id == id).update(data)
        return job_application
