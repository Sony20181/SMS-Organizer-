from fastapi import APIRouter
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session

from .. import crud
from .. import schemas
from ..database import get_db

usersRouter = APIRouter(tags=["Пользователи"])


@usersRouter.get("/users", response_model=list[schemas.User])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@usersRouter.get("/users/{user_id}", response_model=schemas.UserWithEvents)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return db_user


@usersRouter.post("/users", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Такой email уже зарегистрирован")
    return crud.create_user(db=db, user=user)


@usersRouter.put("/users", response_model=schemas.User)
def update_user(user: schemas.User, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user.id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="Такого пользователя не существует")
    return crud.update_user(db=db, user=user)


@usersRouter.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="Такого пользователя не существует")
    return crud.delete_user_by_id(db=db, user_id=user_id)
