import React, { useState } from 'react';

function EventForm({ onFormSubmit ,closeModal}) {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');

    const handleSubmit = (e) => {
        if(eventName){
            e.preventDefault();
            onFormSubmit({ eventName,eventDescription,eventStartTime,eventEndTime });
            closeModal();
        }else alert("Пожалуйста, добавте событие на текущий день!");
      };


  return (
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="eventName">Название события:</label>
          <input
            type="text"
            id="eventName"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="eventDescription">Описание события:</label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="eventStartTime">Время начала события:</label>
          <input
            type="time"
            id="eventStartTime"
            value={eventStartTime}
            onChange={(e) => setEventStartTime(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="eventEndTime">Время окончания события:</label>
          <input
            type="time"
            id="eventEndTime"
            value={eventEndTime}
            onChange={(e) => setEventEndTime(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          Сохранить
        </button>
        <button type="button" onClick={closeModal}>
          Закрыть
        </button>
  </form>
  );
}

export default EventForm;