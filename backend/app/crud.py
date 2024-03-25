from fastapi import HTTPException
from sqlalchemy import update, bindparam
from sqlalchemy.orm import Session

from . import models, schemas


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user: schemas.User):
    db.query(models.User).filter(models.User.id == user.id).update(user.dict())
    db.commit()
    return db.query(models.User).filter(models.User.id == user.id).first()


def delete_user_by_id(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    else:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return db_user


def get_user_events(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return (db.query(models.Event)
            .filter(models.Event.owner_id == user_id)
            .offset(skip)
            .limit(limit)
            .all())


def create_user_event(db: Session, event: schemas.EventCreate):
    user = db.query(models.User).filter(models.User.id == event.owner_id).first()
    if user:
        db_event = models.Event(**event.dict())
        db.add(db_event)
        db.commit()
        db.refresh(db_event)
        return db_event
    else:
        raise HTTPException(status_code=404, detail=f"Пользователя с id {event.owner_id} не существует")


def update_user_event(db: Session, event: schemas.Event):
    user = db.query(models.User).filter(models.User.id == event.owner_id).first()
    if user:
        db.query(models.Event).filter(models.Event.id == event.id).update(event.dict())
        db.commit()
        return db.query(models.Event).filter(models.Event.id == event.id).first()
    else:
        raise HTTPException(status_code=404, detail=f"Пользователя с id {event.owner_id} не существует")


def delete_event(db: Session, event_id: int):
    db_event = db.query(models.Event).filter(models.Event.id == event_id).first()
    db.delete(db_event)
    db.commit()
    return db_event
