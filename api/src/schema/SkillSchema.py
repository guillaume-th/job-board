from marshmallow import Schema, fields


class SkillSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    users = fields.Nested("UserSchema", many=True, exclude=('skills', ))
    advertisements = fields.Nested(
        "AdvertisementSchema", many=True, exclude=("skills", ))
    color = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
