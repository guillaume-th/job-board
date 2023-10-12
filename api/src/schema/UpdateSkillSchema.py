from marshmallow import Schema, fields


class UpdateSkillSchema(Schema):
    name = fields.Str()
    color = fields.Str()
