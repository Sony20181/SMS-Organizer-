import sqlalchemy
from sqlalchemy import Column, String, BigInteger, Date, Time, Index

from .database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(BigInteger, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    event_date = Column(Date, index=True, nullable=False)
    time_start = Column(Time, nullable=False)
    time_end = Column(Time, nullable=False)

    __table_args__ = (
        Index('ix_events_time_start_time_end',
              sqlalchemy.func.tsrange(event_date + time_start, event_date + time_end, '[)'),
              postgresql_using="gist"),
    )

    def __repr__(self):
        return (f"Event(id={self.id}, title={self.title}, description={self.description}, date={self.event_date}, " +
                f"time_start={self.time_start}, time_end={self.time_end}")
