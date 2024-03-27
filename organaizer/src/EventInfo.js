import React, { useState } from 'react';
import axios from 'axios';

function EventInfo({deleteEvent,closeModal, eventData}) {

      const [formData, setFormData] = useState(eventData);
      const [isEditing, setIsEditing] = useState(false); //  модальное окно для выбранного мероприятия
      const [editedEvent, setEditedEvent] = useState(null); // выбранное мероприятие
     
      // для удаления
      const handleDelete = (id, index) => {
        const updatedFormData = formData.filter((event, i) => i !== index);
        setFormData(updatedFormData);
        deleteEvent(id)

      };
      
      formData.sort((a, b) => {
        const time_start_a = a.time_start || '';
        const time_start_b = b.time_start || '';
        return time_start_a.localeCompare(time_start_b);
      });
    
     // для редактирования
      const onEdit = async (updatedEvent) => {
        try {
          await axios.put(`http://95.106.139.183:8080/events`,  updatedEvent );
          const updatedEvents = formData.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          );
          setFormData(updatedEvents);
         
        } catch (error) {
          console.error('Error updating data:', error);
          
        }
      };

      const handleEdit = (event) => {
          setEditedEvent(event);
          setIsEditing(true);
      };
  
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent({ ...editedEvent, [name]: value });
    };
    // сохранить изменения
      const handleSave = () => {
          onEdit(editedEvent);
          setIsEditing(false);
      };
  
      

      
      if (isEditing) {
          return (
              <div style={{ backgroundColor: "lavender", padding: "20px", borderRadius: "10px" }}>
                  <h3>Редактирование информации о событии:</h3>
                  <div className="info-content-change">
                      <label  className="info-content-change-label" htmlFor="title">Название события:</label>
                      <input  className="info-content-change-input" type="text" id="title" name="title" value={editedEvent.title} onChange={handleChange} />
                  </div>
                  <div>
                      <label className="info-content-change-label" htmlFor="description">Описание:</label>
                      <input className="info-content-change-input" type="text" id="description" name="description" value={editedEvent.description} onChange={handleChange} />
                  </div>
                  <label className="info-content-change-label" htmlFor="time_start">Время начала события:
                    <input
                      type="time"
                      name="time_start"
                      value={editedEvent.time_start}
                      onChange={handleChange}
                      className="info-content-change-input"
                    />
                  </label>
                  <label className="info-content-change-label" htmlFor="time_end">Время окончания события:
                    <input
                      type="time"
                      name="time_end"
                      value={editedEvent.time_end}
                      onChange={handleChange}
                      className="info-content-change-input"
                    />
                  </label>
                 
                  <button type="button" onClick={handleSave} style={{ backgroundColor: "rgb(182, 242, 177)", color: "black", padding: "10px", borderRadius: "5px", marginRight: "10px" }}> 
                    Сохранить 
                  </button> 
              </div>
          );
      }

    return (
      <div className="info">
      <h3 className="info-title">Информация о событии:</h3>
      {formData && formData.map((event, index) => (
          <div key={index} className="info-block-information">
                    <p className="info-block-information-p"><strong>Название события:</strong> {event.title}</p>
                    <p className="info-block-information-p"><strong>Описание:</strong> {event.description}</p>
                    <p><strong>Начало:</strong> {event.time_start}</p>
                    <p><strong>Конец:</strong> {event.time_end}</p>
                   
                    <button type="button" onClick={() => handleEdit(event)} className="info-button-change"> 
                    Редактировать 
        </button> 
                    <button type="button" className="info-button-delete" onClick={() => handleDelete(event.id, index)}>Удалить</button>
                    </div>
            ))}
        <button type="button" className="info-button-close" onClick={closeModal}>Закрыть</button>
     
        </div>
    );
  };


  export default EventInfo;