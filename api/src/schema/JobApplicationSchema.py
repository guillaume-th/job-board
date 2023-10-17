from marshmallow import Schema, fields

from models.JobApplication import ApplicationState


class JobApplicationSchema(Schema):
    id = fields.Int()
    candidate = fields.Nested("UserSchema", exclude=(
        "job_applications", "created_advertisements", "skills", "company"))
    candidate_id = fields.Int()
    candidate_name = fields.Str()
    candidate_text = fields.Str()
    candidate_email = fields.Str()
    candidate_phone = fields.Str()
    advertisement = fields.Nested("AdvertisementSchema", exclude=(
        "job_applications", "recruiter", "skills", "company" ))
    state = fields.Enum(ApplicationState)
    messages = fields.Nested("MessageSchema", many=True, exclude=(
        "job_application", "author.job_applications", "author.created_advertisements"))
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
