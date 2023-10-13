from marshmallow import Schema, fields

from models.JobApplication import ApplicationState


class JobApplicationSchema(Schema):
    id = fields.Int()
    candidate = fields.Nested("UserSchema",exclude=("job_applications","created_advertisements",))
    candidate_name = fields.Str()
    candidate_text = fields.Str()
    candidate_email = fields.Str()
    candidate_phone = fields.Str()
    advertisement = fields.Nested("AdvertisementSchema",exclude=("job_applications","recruiter",))
    state = fields.Enum(ApplicationState)
    messages = fields.List(fields.Nested("MessageSchema",exclude=("job_applications","recruiter","candidate")))
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
