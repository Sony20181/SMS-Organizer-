import React, { useState } from 'react';


function EventInfo({ onFormSubmit, closeModal, eventData, onEdit }) {
   /* const [formData, setFormData] = useState(eventData || { eventName: '', eventDescription: '' });
  console.log("eventData",eventData)
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onFormSubmit(formData);
      closeModal();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
        </label>
        <label>
          Event Description:
          <textarea name="eventDescription" value={formData.eventDescription} onChange={handleInputChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    );*/
    const [isEditing, setIsEditing] = useState(false);
    const [editedEvent, setEditedEvent] = useState(null);

    const handleEdit = (event) => {
        setEditedEvent(event);
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(editedEvent);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent({ ...editedEvent, [name]: value });
    };

    if (isEditing) {
        return (
            <div>
                <h3>Редактирование информации о событии:</h3>
                <div>
                    <label htmlFor="eventName">Название события:</label>
                    <input type="text" id="eventName" name="eventName" value={editedEvent.eventName} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Описание:</label>
                    <input type="text" id="description" name="description" value={editedEvent.description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="time">Время:</label>
                    <input type="text" id="time" name="time" value={editedEvent.time} onChange={handleChange} />
                </div>
                <button onClick={handleSave}>Сохранить</button>
            </div>
        );
    }

    return (
        <div>
            <h3>Информация о событии:</h3>
            {eventData && eventData.map((event, index) => (
                <div key={index}>
                    <p><strong>Название события:</strong> {event.eventName}</p>
                    <p><strong>Описание:</strong> {event.description}</p>
                    <p><strong>Время:</strong> {event.time}</p>
                    <button onClick={() => handleEdit(event)}>Редактировать</button>
                </div>
            ))}
            <button onClick={closeModal}>Закрыть</button>
        </div>
    );


  };


  export default EventInfo;