import React, { useState } from 'react';

function EventForm({ onFormSubmit ,closeModal,selectedDay}) {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const handleSubmit = (e) => {
        if(eventName){
            e.preventDefault();
            onFormSubmit({ eventName,eventDescription,eventStartTime,eventEndTime});
            closeModal();
        }else alert("Пожалуйста, добавте событие на текущий день!");
      };


  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "lightblue", padding: "20px", borderRadius: "10px" }}>
        <div style={{ marginBottom: "10px" }}> 
          <label htmlFor="eventName" style={{ fontWeight: "bold" }}>Название события:</label> 
          <input 
            type="text" 
            id="eventName" 
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)} 
            style={{ border: "2px solid #437bc4", borderRadius: "5px", padding: "5px",width:"50%", marginLeft:"10px" }}
          /> 
        </div> 
        <div style={{ marginBottom: "10px"}}> 
          <label htmlFor="eventDescription" style={{ fontWeight: "bold"}}>Описание события:</label> 
          <textarea 
            id="eventDescription" 
            value={eventDescription} 
            onChange={(e) => setEventDescription(e.target.value)} 
            style={{ border: "2px solid #437bc4", borderRadius: "5px", padding: "5px", minHeight: "100px", width:"50%"  }}
          /> 
        </div> 
        <div style={{ marginBottom: "10px" }}> 
          <label htmlFor="eventStartTime" style={{ fontWeight: "bold" }}>Время начала события:</label> 
          <input 
            type="time" 
            id="eventStartTime" 
            value={eventStartTime} 
            onChange={(e) => setEventStartTime(e.target.value)} 
            style={{ border: "2px solid #437bc4", borderRadius: "5px", padding: "5px", width:"50%", marginLeft:"10px" }}
          /> 
        </div> 
        <div style={{ marginBottom: "10px" }}> 
          <label htmlFor="eventEndTime" style={{ fontWeight: "bold" }}>Время окончания события:</label> 
          <input 
            type="time" 
            id="eventEndTime" 
            value={eventEndTime} 
            onChange={(e) => setEventEndTime(e.target.value)} 
            style={{ border: "2px solid #437bc4", borderRadius: "5px", padding: "5px", width:"50%" , marginLeft:"10px"}}
          /> 
        </div> 
        <button type="button" onClick={handleSubmit} style={{ backgroundColor: "#08935b", color: "white", padding: "10px", borderRadius: "5px", marginRight: "10px" }}> 
          Сохранить 
        </button> 
        <button type="button" onClick={closeModal} style={{ backgroundColor: "#970514", color: "white", padding: "10px", borderRadius: "5px" }}> 
          Закрыть 
        </button> 
</form>
  );
}

export default EventForm;