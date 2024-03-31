from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from . import models
from .database import engine
from .events import eventsRouter

# models.Base.metadata.drop_all(bind=engine)
models.Base.metadata.create_all(bind=engine)

tags_metadata = [
    {
        "name": "События",
        "description": "Операции с событиями",
    }
]

description = """
## Наше крутое API для приложения "Календарь" позволит вам: 
* **получать события** 
* **создавать события** 
* **редактировать события** 
* **удалять события** 
"""

app = FastAPI(debug=True,
              title="CalendarAPI",
              summary="API для проекта \"Календарь\"",
              version="2.2.8",
              openapi_tags=tags_metadata,
              description=description)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(GZipMiddleware)

app.include_router(eventsRouter)
