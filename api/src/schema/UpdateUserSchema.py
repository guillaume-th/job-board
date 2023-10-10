from marshmallow import Schema, fields

from models.User import Role


class UpdateUserSchema(Schema):
    username = fields.Str()
    firstname = fields.Str()
    lastname = fields.Str()
    password = fields.Str()
    phone = fields.Str()
