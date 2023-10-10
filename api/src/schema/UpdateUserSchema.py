from marshmallow import Schema, fields

from models.User import Role


class UpdateUserSchema(Schema):
    id = fields.Int()
    username = fields.Str()
    firstname = fields.Str()
    lastname = fields.Str()
    password = fields.Str()
    phone = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
