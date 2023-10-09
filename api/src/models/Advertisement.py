from typing import List
import enum
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Table, Text, Float, func, Enum
from sqlalchemy.orm import relationship, Mapped, mapped_column

from models.Company import Company
from models.JobApplication import JobApplication
from models.User import User
from connect import db


class ContractType(enum.Enum):
    permanent_contract = 1
    temporary_contract = 2
    internship = 3
    apprenticeship = 4


advertisement_skills = Table(
    "advertisement_skill",
    db.metadata,
    Column("advertisement_id", ForeignKey("advertisement.id")),
    Column("skill_id", ForeignKey("skill.id")),
)


class Advertisement(db.Model):
    """Job Advertisement."""

    __tablename__ = "advertisement"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    salary = Column(Float)
    place = Column(String(255))
    working_time = Column(Float)
    contract_type = Column(Enum(ContractType))
    skills = relationship(
        'skill', secondary=advertisement_skills, backref="advertisement")
    recruiter_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    recruiter: Mapped["User"] = relationship(back_populates="user")
    company_id: Mapped[int] = mapped_column(ForeignKey("company.id"))
    company: Mapped["Company"] = relationship(back_populates="company")
    job_applications: Mapped[List["JobApplication"]
                             ] = relationship(back_populates="job_application")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return f"<Advertisement {self.username}>"
