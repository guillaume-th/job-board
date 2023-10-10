from marshmallow import Schema, fields

from models.JobApplication import ApplicationState


class IndustrySchema(Schema):
    id = fields.Int()
    candidate = fields.Nested("UserSchema")
    advertisement = fields.Nested("AdvertisementSchema")
    state = fields.Enum(ApplicationState)
    messages = fields.List(fields.Nested("MessageSchema"))
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
