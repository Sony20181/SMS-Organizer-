from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Boolean, BigInteger
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)

    entries = relationship("CalendarEntry", back_populates="owner")


class CalendarEntry(Base):
    __tablename__ = "entries"

    id = Column(BigInteger, primary_key=True)
    title = Column(String)
    description = Column(String)
    date = Column(DateTime, index=True)
    owner_id = Column(BigInteger, ForeignKey("users.id"))

    owner = relationship("User", back_populates="entries")
