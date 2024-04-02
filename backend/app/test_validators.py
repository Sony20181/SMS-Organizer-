from unittest import TestCase
from validators import validate_time, validate_date
import datetime
from fastapi import HTTPException

class Test(TestCase):
    def test_validate_time(self):
        val = validate_time(None, None)
        self.assertEqual(val, None)

        time_start = datetime.time(22, 22, 00)
        time_end = datetime.time(23, 00, 00)
        val = validate_time(time_start, time_end)
        self.assertEqual(val, None)

        time_end1 = datetime.time(22, 22, 00)
        time_start1 = datetime.time(23, 00, 00)
        answer = HTTPException(status_code=422, detail=f"??????: ????? ?????? ({time_start1.strftime('%H:%M:%S')}) ?? ????? ???? ????? ??? ????? ??????? ????????? ({time_end1.strftime('%H:%M:%S')})")
        with self.assertRaises(HTTPException):
            validate_time(time_start1, time_end1) == answer

        time_end1 = datetime.time(22, 22, 00)
        time_start1 = datetime.time(22, 22, 00)
        answer = HTTPException(status_code=422,
                               detail=f"??????: ????? ?????? ({time_start1.strftime('%H:%M:%S')}) ?? ????? ???? ????? ??? ????? ??????? ????????? ({time_end1.strftime('%H:%M:%S')})")
        with self.assertRaises(HTTPException):
            validate_time(time_start1, time_end1) == answer

    def test_validate_date(self):
        val = validate_date(None, None)
        self.assertEqual(val, None)

        date_start = datetime.date(22, 12, 22)
        date_end = datetime.date(22, 12, 22)
        val = validate_date(date_start, date_end)
        self.assertEqual(val, None)

        date_start = datetime.date(21, 12, 22)
        date_end = datetime.date(22, 12, 22)
        val = validate_date(date_start, date_end)
        self.assertEqual(val, None)

        date_start = datetime.date(22, 12, 22)
        date_end = datetime.date(21, 12, 22)
        answer = HTTPException(status_code=422,
                               detail=f"??????: ???? ?????? ({date_start.strftime('%H:%M:%S')}) ?? ????? ???? ????? ???? ????????? ({date_end.strftime('%H:%M:%S')})")
        with self.assertRaises(HTTPException):
            validate_date(date_start, date_end) == answer

        date_start = datetime.date(22, 10, 10)
        date_end = datetime.date(22, 10, 1)
        answer = HTTPException(status_code=422,
                               detail=f"??????: ???? ?????? ({date_start.strftime('%H:%M:%S')}) ?? ????? ???? ????? ???? ????????? ({date_end.strftime('%H:%M:%S')})")
        with self.assertRaises(HTTPException):
            validate_date(date_start, date_end) == answer
