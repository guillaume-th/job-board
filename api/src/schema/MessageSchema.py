from marshmallow import Schema, fields

from models.JobApplication import ApplicationState


class MessageSchema(Schema):
    id = fields.Int()
    content = fields.Str()
    author = fields.Nested("UserSchema")
    job_application = fields.Nested("JobApplicationSchema")
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
