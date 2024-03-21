import React, { useState } from 'react';


function EventInfo({ onFormSubmit,closeModal, eventData}) {
  /*
   const [formData, setFormData] = useState(eventData || { eventName: '', eventDescription: '' });
  console.log("formData",formData)
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
    const handleDelete = (index) => {
      const updatedFormData = formData.filter((event, i) => i !== index);
      setFormData(updatedFormData);
    };
  
    return (
      <div>
            <h3>Информация:</h3>
            {formData && formData.map((event, index) => (
              <form onSubmit={handleSubmit} key={index}>
                 <label>
                    Назавние:
                    <input type="text" name="eventName" value={event.eventName} onChange={handleInputChange} />
                  </label>
                  <label>
                    Описание:
                    <textarea name="eventDescription" value={event.eventDescription} onChange={handleInputChange} />
                  </label>
                  <label htmlFor="eventStartTime">Время начала события:
                    <input
                      type="time"
                      name="eventStartTime"
                      value={event.eventStartTime}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label htmlFor="eventStartTime">Время окончания события:
                    <input
                      type="time"
                      name="eventStartTime"
                      value={event.eventEndTime}
                      onChange={handleInputChange}
                    />
                  </label>
          
                
                  <button type="button" onClick={() => handleDelete(index)}>Удалить</button>
              </form> 
            ))}
            <button onClick={closeModal}>Закрыть</button>
            <button  onClick={handleSubmit} >Сохранить</button>
        </div>
  
    );
*/
/*  <form onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input type="text" name="eventName" value={formData.eventName} onChange={handleInputChange} />
        </label>
        <label>
          Event Description:
          <textarea name="eventDescription" value={formData.eventDescription} onChange={handleInputChange} />
        </label>
        <button type="submit">Save</button>
      </form>  */
      const [formData, setFormData] = useState(eventData || { eventName: '', eventDescription: '' });
      const [isEditing, setIsEditing] = useState(false);
      const [editedEvent, setEditedEvent] = useState(null);
  
      const handleEdit = (event) => {
          setEditedEvent(event);
          setIsEditing(true);
      };
  
      const handleSave = () => {
       //   onEdit(editedEvent);
          setIsEditing(false);
      };
  
      const handleChange = (e) => {
          const { name, value } = e.target;
          setEditedEvent({ ...editedEvent, [name]: value });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        onFormSubmit(formData);
        closeModal();
        
      };
      const handleDelete = (index) => {
        const updatedFormData = formData.filter((event, i) => i !== index);
        setFormData(updatedFormData);
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
                  <label htmlFor="eventStartTime">Время начала события:
                    <input
                      type="time"
                      name="eventStartTime"
                      value={editedEvent.eventStartTime}
                      onChange={handleChange}
                    />
                  </label>
                  <label htmlFor="eventStartTime">Время окончания события:
                    <input
                      type="time"
                      name="eventStartTime"
                      value={editedEvent.eventEndTime}
                      onChange={handleChange}
                    />
                  </label>
                  <button onClick={handleSave}>Сохранить</button>
              </div>
          );
      }

    return (
      <div>
      <h3>Информация о событии:</h3>
      {formData && formData.map((event, index) => (
          <div key={index}>
                    <p><strong>Название события:</strong> {event.eventName}</p>
                    <p><strong>Описание:</strong> {event.eventDescription}</p>
                    <p><strong>Начало:</strong> {event.eventStartTime}</p>
                    <p><strong>Конец:</strong> {event.eventEndTime}</p>
                    <button onClick={() => handleEdit(event)}>Редактировать</button>
                    <button type="button" onClick={() => handleDelete(index)}>Удалить</button>
                    </div>
            ))}
            <button onClick={closeModal}>Закрыть</button>
            <button  onClick={handleSubmit} >Сохранить</button>
        </div>
    );


  };


  export default EventInfo;