from marshmallow import Schema, fields


class IndustrySchema(Schema):
    id = fields.Int()
    name = fields.Str()
    companies = fields.List(fields.Nested("CompanySchema"))
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
