from marshmallow import Schema, fields


class CompanySchema(Schema):
    id = fields.Int()
    name = fields.Str()
    users = fields.Nested("UserSchema", many=True, exclude=("company", ))
    advertisements = fields.Nested(
        "AdvertisementSchema", many=True, exclude=("company", ))
    industry = fields.Nested("IndustrySchema", exclude=("companies", ))
    description = fields.Str()
    avatar = fields.Str()
    banner = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
