import enum
from typing import List
from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, func
from sqlalchemy.orm import relationship, mapped_column, Mapped

from connect import db


class ApplicationState(enum.Enum):
    sent = 1
    processing = 2
    refused = 3
    accepted = 4


class JobApplication(db.Model):
    """Job Application."""

    __tablename__ = "job_application"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    candidate_id = mapped_column(ForeignKey("user.id"))
    candidate: Mapped["User"] = relationship(back_populates="job_applications")
    advertisement_id = mapped_column(ForeignKey("advertisement.id"))
    advertisement: Mapped["Advertisement"] = relationship(
        back_populates="job_applications")
    state = Column(Enum(ApplicationState))
    messages: Mapped[List["Message"]] = relationship(
        back_populates="job_application")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return f"<Job application {self.id}>"
