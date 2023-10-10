from marshmallow import Schema, fields

from models.Advertisement import ContractType


class AdvertisementSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    description = fields.Str()
    salary = fields.Float()
    place = fields.Str()
    working_time = fields.Float()
    contract_type = fields.Enum(ContractType)
    skills = fields.List(fields.Nested("SkillSchema"))
    recruiter = fields.Nested("UserSchema")
    company = fields.Nested("CompanySchema")
    job_applications = fields.List(fields.Nested("JobApplicationSchema"))
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
