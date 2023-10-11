from marshmallow import Schema, fields


class AuthUserSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)
