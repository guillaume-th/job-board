from marshmallow import Schema, fields

from models.JobApplication import ApplicationState


class JobApplicationSchema(Schema):
    id = fields.Int()
    candidate = fields.Nested("UserSchema")
    candidate_name = fields.Str()
    candidate_text = fields.Str()
    candidate_email = fields.Str()
    candidate_phone = fields.Str()
    advertisement = fields.Nested("AdvertisementSchema")
    state = fields.Enum(ApplicationState)
    messages = fields.List(fields.Nested("MessageSchema"))
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
