from marshmallow import Schema, fields


class IndustrySchema(Schema):
    id = fields.Int()
    name = fields.Str()
    companies = fields.Nested(
        "CompanySchema", many=True, exclude=("industry", ))
    color = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
