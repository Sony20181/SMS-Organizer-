import React, { useState } from 'react';
import axios from 'axios';
import { FaStarOfLife } from "react-icons/fa";
import { ModalErrorTime } from './ModalErrorTime';
import { ModalErrorTimeInterval } from './ModalErrorTimeInterval';

function EventInfo({deleteEvent,closeModal, eventData, selectedDay}) {

      const [formData, setFormData] = useState(eventData);
      const [isEditing, setIsEditing] = useState(false); //  модальное окно для выбранного мероприятия
      const [editedEvent, setEditedEvent] = useState(null); // выбранное мероприятие
      const [error, setError] = useState(false);
      const [errorTitle, setErrorTitle] = useState(false);
      const [errorStrartTime, setErrorStrartTime] = useState(false);
      const [errorEndTime, setErrorEndTime] = useState(false);

      const [modalErrorTime, setModalErrorTime] = useState(false);
      const [modalErrorTimeInterval, setModalErrorTimeInterval] = useState(false);
      const [old_event, setOld_event] = useState("");
      const [new_event, setNew_event] = useState(null);
      const [oldStartTime, setOldStartTime] = useState("");
      const [oldEndTime, setOldEndTime] = useState("");
      const [newStartTime, setnewStartTime] = useState("");
      const [newEndTime, setnewEndTime] = useState("");
      
      const closeModalErrorTime = () => {
        setModalErrorTime(false);
      };
      const closeModalErrorTimeInterval = () => {
        setModalErrorTimeInterval(false);
      };
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
        let hasOverlap = false;
       if (updatedEvent.title && updatedEvent.time_start && updatedEvent.time_end ){
        if (updatedEvent.time_start >= updatedEvent.time_end) {
             setModalErrorTime(true)
         }
         else{
          formData.forEach(event => {
            if (
              event.event_date === selectedDay &&
              updatedEvent.time_start < event.time_end &&
              updatedEvent.time_end > event.time_start
                
            ) {
                hasOverlap = true;
                setOld_event(event.title);
                setOldStartTime(event.time_start);
                setOldEndTime(event.time_end);
                setNew_event(updatedEvent.title);
                setnewStartTime(updatedEvent.time_start);
                setnewEndTime(updatedEvent.time_end);
                setModalErrorTimeInterval(true)
                
            }
          });
          if (hasOverlap) {
            setModalErrorTimeInterval(true)
          } 
          else{
            //setModalErrorTimeInterval(false);
            try {
              await axios.put(`http://82.140.216.9:8080/events`,  updatedEvent );
              const updatedEvents = formData.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event
              );
              
              setFormData(updatedEvents);
              setIsEditing(false);
              setErrorTitle(false)
              setErrorStrartTime(false)
              setErrorEndTime(false)
              setError(false);
             
              } catch (error) {console.error('Error updating data:', error);}
          }
          
  
          }
         }
       else{
        if(!updatedEvent.title){
          setErrorTitle(true)
        }
        else{setErrorTitle(false)}
        if(!updatedEvent.time_start){
          setErrorStrartTime(true)
        }else{setErrorStrartTime(false)}
        if(!updatedEvent.time_end){
          setErrorEndTime(true)
        }else{setErrorEndTime(false)}
        setError(true);
      }  
      };

      const handleEdit = (event) => {
          setEditedEvent(event);
          setIsEditing(true);
      };
  
      const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent({ ...editedEvent, [name]: value });
       if (name == "title") { setErrorTitle(false)}
       if (name == "time_start") { setErrorStrartTime(false)}
       if (name == "time_end") { setErrorEndTime(false)}
       setError(false);
        
        
    };
    // сохранить изменения
      const handleSave = () => {
          onEdit(editedEvent);
          //setIsEditing(false);
      };
  
      

      
      if (isEditing) {
          return (
              <div style={{ backgroundColor: "lavender", padding: "20px", borderRadius: "10px" }}>
                <ModalErrorTime isOpen={modalErrorTime} onClose={closeModalErrorTime} />
                <ModalErrorTimeInterval 
                  isOpen={modalErrorTimeInterval} 
                  old_event = {old_event} 
                  oldStartTime = {oldStartTime}
                  oldEndTime = {oldEndTime}
                  new_event = {new_event} 
                  eventStartTime = {newStartTime}
                  eventEndTime = {newEndTime}
                  onClose={closeModalErrorTimeInterval} 
                />
                {error && <p style={{ color: "red" }}>Пожалуйста, заполните все обязательные поля!</p>}
    
                  <h3>Редактирование информации:</h3>
                  <div className="info-content-change">
                      <label  className="info-content-change-label" htmlFor="title">Название события<FaStarOfLife  style={{ color:"red", width:"1%" }}/>:</label>
                      <input  className="info-content-change-input" style={{ borderColor: errorTitle ?  'red' : "rgb(121, 161, 161)" }} type="text" id="title" name="title" value={editedEvent.title} onChange={handleChange} />
                  </div>
                  <div>
                      <label className="info-content-change-label" htmlFor="description">Описание:</label>
                      <input className="info-content-change-input" type="text" id="description" name="description" value={editedEvent.description} onChange={handleChange} />
                  </div>
                  <label className="info-content-change-label"  htmlFor="time_start">Время начала события<FaStarOfLife  style={{ color:"red", width:"1%" }}/>:
                    <input
                      type="time"
                      name="time_start"
                      value={editedEvent.time_start}
                      onChange={handleChange}
                      className="info-content-change-input"
                      style={{  borderColor: errorStrartTime ?  'red' : "rgb(121, 161, 161)"  }}
                    />
                  </label>
                  <label className="info-content-change-label" htmlFor="time_end">Время окончания события<FaStarOfLife  style={{ color:"red", width:"1%" }}/>:
                    <input
                      type="time"
                      name="time_end"
                      value={editedEvent.time_end}
                      onChange={handleChange}
                      className="info-content-change-input"
                      style={{ borderColor: errorEndTime ?  'red' : "rgb(121, 161, 161)" }}
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