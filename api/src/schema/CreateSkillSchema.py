from marshmallow import Schema, fields


class SkillSchema(Schema):
    name = fields.Str()
    color = fields.Str()
