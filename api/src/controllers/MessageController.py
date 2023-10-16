from models.Message import Message
from connect import db


class MessageController():

    def __init__(self) -> None:
        pass

    def get_all_messages_by_job_id(self,id):
        message = db.session.query(Message).filter(Message.job_application_id == id).all()
        return message
    
    def get_all(self):
        message = db.session.query(Message).all()
        return message

    def get(self, id):
        message = db.session.query(Message).filter(
            Message.id == id).one_or_none()
        return message

    def create(self, data):
        message = Message(**data)
        return message

    def update(self, data, id):
        message = db.session.query(Message).filter(
            Message.id == id).update(data)
        return message