from datetime import date, time

from pydantic import BaseModel, EmailStr


class Event(BaseModel):
    id: int
    title: str
    description: str
    event_date: date
    time_start: time
    time_end: time
    owner_id: int

    class Config:
        from_attributes = True


class EventCreate(BaseModel):
    title: str
    description: str
    event_date: date
    time_start: time
    time_end: time
    owner_id: int


class User(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True


class UserWithEvents(User):
    events: list[Event] = []


class UserCreate(BaseModel):
    name: str
    email: EmailStr
