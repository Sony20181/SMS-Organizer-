from datetime import date, time

from pydantic import BaseModel


class EventSchema(BaseModel):
    id: int
    title: str
    description: str
    event_date: date
    time_start: time
    time_end: time

    class Config:
        from_attributes = True


class EventCreate(BaseModel):
    title: str
    description: str
    event_date: date
    time_start: time
    time_end: time
