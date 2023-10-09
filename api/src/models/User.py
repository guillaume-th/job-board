import enum
from typing import List
from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String, Table, Text, func
from sqlalchemy.orm import relationship, Mapped, mapped_column

from models.Company import Company
from models.JobApplication import JobApplication
from connect import db


class Role(enum.Enum):
    admin = 1
    recruiter = 2
    candidate = 3


user_skills = Table(
    "user_skill",
    db.metadata,
    Column("user_id", ForeignKey("user.id")),
    Column("skill_id", ForeignKey("skill.id")),
)


class User(db.Model):
    """User account."""

    __tablename__ = "user"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    firstname = Column(String(255))
    lastname = Column(String(255))
    password = Column(Text, nullable=False)
    phone = Column(String(255))
    role = Column(Enum(Role), nullable=False)
    skills: Mapped[List["Skill"]] = relationship(
        'skill', secondary=user_skills, backref="user")
    created_advertisements: Mapped[List["Advertisement"]] = relationship(
        back_populates="advertisement")  # for recruiters
    company_id = mapped_column(ForeignKey("company.id"))
    company: Mapped["Company"] = relationship(back_populates="company")
    job_applications: Mapped[List["JobApplication"]  # for candidates
                             ] = relationship(back_populates="job_application")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return f"<User {self.username}>"
