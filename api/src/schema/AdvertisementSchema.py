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
    skills = fields.Nested("SkillSchema", many=True,
                           exclude=("advertisements", "users",))
    recruiter = fields.Nested(
        "UserSchema", exclude=("created_advertisements", "skills", "job_applications", "company",))
    company = fields.Nested(
        "CompanySchema", exclude=("advertisements", "users",))
    job_applications = fields.Nested(
        "JobApplicationSchema", many=True, exclude=("advertisement","candidate","messages"))
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
