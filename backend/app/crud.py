from datetime import date, time

from sqlalchemy import text
from sqlalchemy.orm import Session

from . import models, schemas
from .models import Event


def get_events(db: Session, date_begin: date | None, date_end: date | None):
    query = (db.query(Event)
             .order_by(Event.event_date,
                       Event.time_start,
                       Event.time_end))
    if date_begin is not None:
        query = query.filter(Event.event_date >= date_begin)
    if date_end is not None:
        query = query.filter(Event.event_date <= date_end)
    return query.all()


def get_overlapping_events(event_date: date, time_start: time, time_end: time, db: Session):
    sql = ("SELECT *\n"
           "FROM events e\n"
           "WHERE e.event_date = :ed\n"
           "  AND tsrange(e.event_date + (:ts)::time, e.event_date + (:te)::time, '[)')\n"
           "    && tsrange(e.event_date + e.time_start, e.event_date + e.time_end, '[)')")

    intersections = db.execute(text(sql), {'ed': event_date, 'ts': time_start, 'te': time_end})
    return intersections.all()


def create_event(db: Session, event: schemas.EventCreate):
    db_event = models.Event(**event.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


def update_event(db: Session, event: schemas.EventSchema):
    db.query(Event).filter(Event.id == event.id).update(event.dict())
    db.commit()
    return db.query(Event).filter(Event.id == event.id).first()


def delete_event(db: Session, event_id: int):
    db_event = db.query(Event).filter(Event.id == event_id).first()
    db.delete(db_event)
    db.commit()
    return db_event
