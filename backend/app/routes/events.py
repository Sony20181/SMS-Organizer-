from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..database import get_db

eventsRouter = APIRouter(tags=["События"])


@eventsRouter.get("/events/{user_id}", response_model=list[schemas.Event])
def get_events(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_user_events(db, user_id=user_id, skip=skip, limit=limit)


@eventsRouter.post("/events", response_model=schemas.Event)
def create_event_for_user(event: schemas.EventCreate, db: Session = Depends(get_db)):
    return crud.create_user_event(db=db, event=event)


@eventsRouter.put("/events", response_model=schemas.Event)
def update_event_for_user(event: schemas.Event, db: Session = Depends(get_db)):
    return crud.update_user_event(db=db, event=event)


@eventsRouter.delete("/events/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    return crud.delete_event(db, event_id)
