from marshmallow import Schema, fields


class CompanySchema(Schema):
    id = fields.Int()
    name = fields.Str()
    users = fields.List(fields.Nested("UserSchema"))
    advertisements = fields.List(fields.Nested("AdvertisementSchema"))
    industry = fields.Nested("IndustrySchema")
    description = fields.Str()
    avatar = fields.Str()
    banner = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
