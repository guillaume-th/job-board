from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import relationship, Mapped

from connect import db


class Message(db.Model):
    """Message."""

    __tablename__ = "message"

    id = Column(Integer, primary_key=True, autoincrement="auto")

    content = Column(String(1024), nullable=False)
    author_id: Mapped[int] = Column(ForeignKey("user.id"))
    author: Mapped["User"] = relationship(
        foreign_keys=[author_id])
    job_application_id = Column(ForeignKey("job_application.id"))
    job_application: Mapped["JobApplication"] = relationship(
        back_populates="messages")

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return f"<Industry {self.name}>"
