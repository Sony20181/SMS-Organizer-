import React, { useState,useEffect } from 'react';
import { FaStarOfLife } from "react-icons/fa";
import { ModalErrorTime } from './ModalErrorTime';
import { ModalErrorTimeInterval } from './ModalErrorTimeInterval';

function EventForm({ onFormSubmit ,closeModal,events,selectedDay}) {
    const [currentDate, setCurrentDate] = useState(new Date());  
   
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventStartTime, setEventStartTime] = useState(`${currentDate.getHours()}:${(currentDate.getMinutes()).toString().padStart(2, '0')}:00`);
    const [eventEndTime, setEventEndTime] = useState(`${(currentDate.getHours()+1).toString().padStart(2, '0')}:${(currentDate.getMinutes()).toString().padStart(2, '0')}:00`);
    const [fieldsValid, setFieldsValid] = useState({
      eventName: true,
      eventStartTime: true,
      eventEndTime: true,
    });
    const [error, setError] = useState(false);
    const [modalErrorTime, setModalErrorTime] = useState(false);
    const [modalErrorTimeInterval, setModalErrorTimeInterval] = useState(false);
    const [old_event, setOld_event] = useState("");
    const [new_event, setNew_event] = useState(null);
    const [oldStartTime, setOldStartTime] = useState("");
    const [oldEndTime, setOldEndTime] = useState("");
    
    
    const closeModalErrorTime = () => {
      setModalErrorTime(false);
    };
    const closeModalErrorTimeInterval = () => {
      setModalErrorTimeInterval(false);
    };
    const handleAddEvent = (name, time_start, time_end,selectedDay) => {
      let hasOverlap = false;
      events.forEach(event => {
        let timeString = event.time_end
        let parts = timeString.split(":");
        let hours = parts[0];
        let minutes = parts[1];
        let time = hours + ":"+ minutes
          if (
            event.event_date === selectedDay &&
            time_start < time &&
            time_end >= event.time_start
              
          ) {
              hasOverlap = true;
              setOld_event(event.title);
              setOldStartTime(event.time_start);
              setOldEndTime(event.time_end);
             
          }
      });

      if (hasOverlap) {
          setModalErrorTimeInterval(true)
      } 
      else{
        setModalErrorTimeInterval(false);
        return true
      }
  };
    const handleSubmit = () => {
      
      if (eventName.trim() === '' || eventStartTime.trim() === '' || eventEndTime.trim() === '' ) {
        setFieldsValid({
          eventName: eventName.trim() !== '',
          eventStartTime: eventStartTime.trim() !== '',
          eventEndTime: eventEndTime.trim() !== '',
        });
        setError(true);
        
      }else{
        //fieldsValid.eventName = true;
        
        const ок = handleAddEvent(eventName,eventStartTime, eventEndTime,selectedDay)
        if (eventStartTime >= eventEndTime) {
          setModalErrorTime(true)
          
         }
      else if (ок){
        setError(false);
          onFormSubmit({ eventName,eventDescription,eventStartTime,eventEndTime});
          closeModal();
        }
      }  
     
      
    };




  return (
    
    <form onSubmit={handleSubmit} style={{ backgroundColor: "lavender", padding: "20px", borderRadius: "10px" }}>
      <ModalErrorTime isOpen={modalErrorTime} onClose={closeModalErrorTime} />
      <ModalErrorTimeInterval 
        isOpen={modalErrorTimeInterval} 
        old_event = {old_event} 
        oldStartTime = {oldStartTime}
        oldEndTime = {oldEndTime}
        new_event = {eventName} 
        eventStartTime = {eventStartTime}
        eventEndTime = {eventEndTime}
        onClose={closeModalErrorTimeInterval} 
      />
      {error && <p style={{ color: "red" }}>Пожалуйста, заполните все обязательные поля!</p>}
        <div style={{ marginBottom: "10px", width:"90%",display: "flex",alignItems: "center",justifyContent: "space-between" }}> 
          <label htmlFor="eventName" style={{ fontWeight: "bold" }}>Название события <FaStarOfLife  style={{ color:"red", width:"3%" }}/> :</label> 
          <input 
            type="text" 
            id="eventName" 
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)} 
            style={{ border: "2px solid rgb(121, 161, 161)", borderColor: fieldsValid.eventName ? "rgb(121, 161, 161)" : 'red', borderRadius: "5px", padding: "5px",width:"62%", marginLeft:"10px" }}
          /> 
        </div>  
      
        <div style={{ marginBottom: "10px", width:"90%",display: "flex",alignItems: "center",justifyContent: "space-between" }}> 
          <label htmlFor="eventDescription" style={{ fontWeight: "bold"}}>Описание события:</label> 
          <textarea 
            id="eventDescription" 
            value={eventDescription} 
            onChange={(e) => setEventDescription(e.target.value)} 
            style={{ border: "2px solid rgb(121, 161, 161)", borderRadius: "5px", padding: "5px", minHeight: "100px", minWidth:"62%",maxWidth:"62%"  }}
          /> 
        </div> 
        <div style={{ marginBottom: "10px", width:"90%",display: "flex",alignItems: "center",justifyContent: "space-between"  }}> 
          <label htmlFor="eventStartTime" style={{ fontWeight: "bold" }}>Время начала <FaStarOfLife  style={{ color:"red", width:"3%" }}/> :</label> 
          <input 
            type="time" 
            id="eventStartTime" 
            value={eventStartTime} 
            onChange={(e) => setEventStartTime(e.target.value)} 
            step="1"
            style={{ border: "2px solid rgb(121, 161, 161)",borderColor: fieldsValid.eventStartTime   ? "rgb(121, 161, 161)" : 'red', borderRadius: "5px", padding: "5px", width:"70%", marginLeft:"10px" }}
          /> 
        </div> 
        <div style={{ marginBottom: "10px" , width:"90%",display: "flex",alignItems: "center",justifyContent: "space-between" }}> 
          <label htmlFor="eventEndTime" style={{ fontWeight: "bold" }}>Время окончания <FaStarOfLife  style={{ color:"red", width:"3%" }}/> :</label> 
          <input 
            type="time" 
            id="eventEndTime" 
            value={eventEndTime} 
            onChange={(e) => setEventEndTime(e.target.value)} 
            step="1"
            style={{ border: "2px solid rgb(121, 161, 161)",borderColor: fieldsValid.eventEndTime  ? "rgb(121, 161, 161)" : 'red', borderRadius: "5px", padding: "5px", width:"70%" , marginLeft:"10px"}}
          /> 
        </div> 
        <button type="button" onClick={handleSubmit} style={{ backgroundColor: "rgb(182, 242, 177)", color: "black", padding: "10px", borderRadius: "5px", marginRight: "10px" }}>
        Сохранить
      </button>
        <button type="button" onClick={closeModal} style={{ backgroundColor: "rgb(135, 168, 168)", color: "black", padding: "10px", borderRadius: "5px" }}> 
          Закрыть 
        </button> 
</form>
  );
}

export default EventForm;