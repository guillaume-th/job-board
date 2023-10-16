from marshmallow import Schema, fields

from models.User import Role


class UserSchema(Schema):
    id = fields.Int()
    username = fields.Str()
    email = fields.Email()
    firstname = fields.Str()
    lastname = fields.Str()
    password = fields.Str()
    phone = fields.Str()
    role = fields.Enum(Role)
    skills = fields.Nested("SkillSchema", many=True, exclude=("users",))
    created_advertisements = fields.Nested(
        "AdvertisementSchema", many=True, exclude=("recruiter", ))
    company = fields.Nested("CompanySchema", exclude=("users", ))
    job_applications = fields.Nested(
        "JobApplicationSchema", many=True, exclude=("candidate",))
    description = fields.Str()
    avatar = fields.Str()
    adress = fields.Str()
    birthdate = fields.DateTime()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
