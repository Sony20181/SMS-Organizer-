from sqlalchemy import Column, ForeignKey, String, BigInteger, Date, Time
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(BigInteger, primary_key=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)

    events = relationship("Event", back_populates="owner")

    def __repr__(self):
        return f"User(id={self.id}, name={self.name}, email={self.email}"


class Event(Base):
    __tablename__ = "events"

    id = Column(BigInteger, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    event_date = Column(Date, index=True, nullable=False)
    time_start = Column(Time, nullable=False)
    time_end = Column(Time, nullable=False)
    owner_id = Column(BigInteger, ForeignKey("users.id"), nullable=False)

    owner = relationship("User", back_populates="events")

    def __repr__(self):
        return (f"Event(id={self.id}, title={self.title}, description={self.description}, date={self.event_date}, " +
                f"time_start={self.time_start}, time_end={self.time_end}, owner_id={self.owner_id}")
