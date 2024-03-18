from datetime import datetime

from pydantic import BaseModel


class EntryBase(BaseModel):
    title: str
    description: str
    date: datetime
    owner_id: int


class EntryCreate(EntryBase):
    pass


class Entry(EntryBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str


class User(UserBase):
    id: int
    entries: list[Entry] = []

    class Config:
        orm_mode = True
