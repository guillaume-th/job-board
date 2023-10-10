from marshmallow import Schema, fields


class SkillSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    users = fields.List(fields.Nested("UserSchema"))
    advertisements = fields.List(fields.Nested("AdvertisementSchema"))
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
