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
    skills = fields.List(fields.Nested("SkillSchema"))
    created_advertisements = fields.List(fields.Nested("AdvertisementSchema"))
    company = fields.Nested("CompanySchema")
    job_applications = fields.List(fields.Nested("JobApplicationSchema"))
    description = fields.Str()
    avatar = fields.Str()
    adress = fields.Str()
    birthdate = fields.DateTime()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
