from datetime import date, time

from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from . import crud, schemas
from .database import get_db
from .validators import validate_time, validate_date

eventsRouter = APIRouter(tags=["События"])


@eventsRouter.get("/events", response_model=list[schemas.EventSchema],
                  name="Получение событий")
def get_events(date_begin: date | None = None, date_end: date | None = None, db: Session = Depends(get_db)):
    validate_date(date_begin, date_end)
    return crud.get_events(db=db, date_begin=date_begin, date_end=date_end)


@eventsRouter.get("/overlapping_events", response_model=list[schemas.EventSchema],
                  name="Получение пересекающихся событий")
def get_overlapping_events(event_date: date, time_start: time, time_end: time, db: Session = Depends(get_db)):
    validate_time(time_start, time_end)
    return crud.get_overlapping_events(event_date=event_date, time_start=time_start, time_end=time_end, db=db)


@eventsRouter.post("/events", response_model=schemas.EventSchema,
                   name="Создать событие")
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    validate_time(event.time_start, event.time_end)
    return crud.create_event(db=db, event=event)


@eventsRouter.put("/events", response_model=schemas.EventSchema,
                  name="Обновить событие")
def update_event(event: schemas.EventSchema, db: Session = Depends(get_db)):
    validate_time(event.time_start, event.time_end)
    return crud.update_event(db=db, event=event)


@eventsRouter.delete("/events/{event_id}", name="Удалить событие")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    return crud.delete_event(db=db, event_id=event_id)
