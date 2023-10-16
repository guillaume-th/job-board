from marshmallow import Schema, fields

from models.User import Role


class UpdateUserSchema(Schema):
    username = fields.Str(required=True)
    email = fields.Email(required=True)
    firstname = fields.Str()
    lastname = fields.Str()
    password = fields.Str()
    phone = fields.Str()
    skills = fields.List(fields.Int())
    companies = fields.List(fields.Int())
    avatar = fields.Str()
    role = fields.Enum(Role)
    birthdate = fields.DateTime()
    description = fields.Str()
    adress = fields.Str()
    company_id = fields.Int()
