from datetime import date

from marshmallow import Schema, fields

from models.User import Role


class CreateUserSchema(Schema):
    username = fields.Str(required=True)
    email = fields.Email(required=True)
    firstname = fields.Str()
    lastname = fields.Str()
    password = fields.Str(required=True)
    phone = fields.Str()
    role = fields.Enum(Role)
    company_id = fields.Int()
