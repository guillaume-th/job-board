from typing import List
from sqlalchemy import Column, DateTime, Integer, String, func
from sqlalchemy.orm import relationship, Mapped


from connect import db


class Industry(db.Model):
    """Company industries."""

    __tablename__ = "industry"

    id = Column(Integer, primary_key=True, autoincrement="auto")
    name = Column(String(255), unique=True, nullable=False)
    companies: Mapped[List["Company"]] = relationship(
        back_populates="industry")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return f"<Industry {self.name}>"
