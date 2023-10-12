from marshmallow import Schema, fields


class CreateSkillSchema(Schema):
    name = fields.Str()
    color = fields.Str()
