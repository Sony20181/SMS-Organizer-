from datetime import time, date

from fastapi import HTTPException


def validate_time(time_start: time | None, time_end: time | None):
    if (time_start is not None and time_end is not None) and (time_start >= time_end):
        raise HTTPException(status_code=422,
                            detail=f"Ошибка: "
                                   f"время начала ({time_start.strftime("%H:%M:%S")}) "
                                   f"не может быть позже или равно "
                                   f"времени окончания ({time_end.strftime("%H:%M:%S")})")


def validate_date(date_start: date | None, date_end: date | None):
    if (date_start is not None and date_end is not None) and (date_start > date_end):
        raise HTTPException(status_code=422,
                            detail=f"Ошибка: "
                                   f"дата события ({date_start.strftime("%d-%m-%Y")}) "
                                   f"не может быть позже "
                                   f"даты окончания ({date_end.strftime("%d-%m-%Y")})")
