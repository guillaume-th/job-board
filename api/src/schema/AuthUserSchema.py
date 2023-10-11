from marshmallow import Schema, fields


class CreateUserSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)
