from typing import List
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import relationship, Mapped

from connect import db


class Message(db.Model):
    """Message."""

    __tablename__ = "message"

    id = Column(Integer, primary_key=True, autoincrement="auto")

    recruiter_id: Mapped[int] = Column(ForeignKey("user.id"))
    recruiter: Mapped["User"] = relationship(
        foreign_keys=[recruiter_id])

    candidate_id: Mapped[int] = Column(ForeignKey("user.id"))
    candidate: Mapped["User"] = relationship(
        foreign_keys=[candidate_id])

    job_application_id = Column(ForeignKey("job_application.id"))
    job_application: Mapped["JobApplication"] = relationship(
        back_populates="messages")

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return f"<Industry {self.name}>"
