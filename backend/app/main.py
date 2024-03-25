from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from . import models
from .database import engine
from .routes.events import eventsRouter
from .routes.users import usersRouter

import time
from typing import Callable

from fastapi import APIRouter, FastAPI, Request, Response
from fastapi.routing import APIRoute

# models.Base.metadata.drop_all(bind=engine)
models.Base.metadata.create_all(bind=engine)


class TimedRoute(APIRoute):
    def get_route_handler(self) -> Callable:
        original_route_handler = super().get_route_handler()

        async def custom_route_handler(request: Request) -> Response:
            before = time.time()
            response: Response = await original_route_handler(request)
            duration = time.time() - before
            response.headers["X-Response-Time"] = str(duration)
            print(f"route duration: {duration}")
            print(f"route response: {response}")
            print(f"route response headers: {response.headers}")
            return response

        return custom_route_handler


tags_metadata = [
    {
        "name": "Пользователи",
        "description": "Операции с пользователями.",
    },
    {
        "name": "События",
        "description": "Операции с событиями",
    },
]

description = """
## Наше крутое API для приложения "Календарь" позволит вам: 
* **создавать и получать пользователей** в системе :D
* **создавать события** 
"""

app = FastAPI(debug=True,
              title="CalendarAPI",
              summary="API для проекта \"Календарь\"",
              version="2.2.8",
              openapi_tags=tags_metadata,
              description=description,
              route_class=TimedRoute)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(GZipMiddleware)

app.include_router(usersRouter)
app.include_router(eventsRouter)
