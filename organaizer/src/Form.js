import React, { useState } from 'react';
import { FaStarOfLife } from "react-icons/fa";
function EventForm({ onFormSubmit ,closeModal}) {
    const [currentDate, setCurrentDate] = useState(new Date());  

    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState(' ');
    const [eventStartTime, setEventStartTime] = useState(`${currentDate.getHours()}:${(currentDate.getMinutes()).toString().padStart(2, '0')}:00`);
    const [eventEndTime, setEventEndTime] = useState(`${(currentDate.getHours()+1).toString().padStart(2, '0')}:${(currentDate.getMinutes()).toString().padStart(2, '0')}:00`);
    const [fieldsValid, setFieldsValid] = useState({
      eventName: true,
      eventStartTime: true,
      eventEndTime: true,
    });
    const handleSubmit = () => {
      if (eventName.trim() === '' || eventStartTime.trim() === '' || eventEndTime.trim() === '' ) {
        setFieldsValid({
          eventName: eventName.trim() !== '',
          eventStartTime: eventStartTime.trim() !== '',
          eventEndTime: eventEndTime.trim() !== '',
        });
        
      }else{
        onFormSubmit({ eventName,eventDescription,eventStartTime,eventEndTime});
        closeModal();
      }
      
    };

   /* const handleSubmit = (e) => {
        if(eventName){
            e.preventDefault();
            onFormSubmit({ eventName,eventDescription,eventStartTime,eventEndTime});
            closeModal();
        }else alert("Пожалуйста, добавте событие на текущий день!");
      };*/


  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: "lavender", padding: "20px", borderRadius: "10px" }}>
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
          <label htmlFor="eventStartTime" style={{ fontWeight: "bold" }}>Время начала события <FaStarOfLife  style={{ color:"red", width:"3%" }}/> :</label> 
          <input 
            type="time" 
            id="eventStartTime" 
            value={eventStartTime} 
            onChange={(e) => setEventStartTime(e.target.value)} 
            style={{ border: "2px solid rgb(121, 161, 161)",borderColor: fieldsValid.eventStartTime   ? "rgb(121, 161, 161)" : 'red', borderRadius: "5px", padding: "5px", width:"70%", marginLeft:"10px" }}
          /> 
        </div> 
        <div style={{ marginBottom: "10px" , width:"90%",display: "flex",alignItems: "center",justifyContent: "space-between" }}> 
          <label htmlFor="eventEndTime" style={{ fontWeight: "bold" }}>Время окончания события <FaStarOfLife  style={{ color:"red", width:"3%" }}/> :</label> 
          <input 
            type="time" 
            id="eventEndTime" 
            value={eventEndTime} 
            onChange={(e) => setEventEndTime(e.target.value)} 
            style={{ border: "2px solid rgb(121, 161, 161)",borderColor: fieldsValid.eventEndTime  ? "rgb(121, 161, 161)" : 'red', borderRadius: "5px", padding: "5px", width:"70%" , marginLeft:"10px"}}
          /> 
        </div> 
       {/** <button type="button" onClick={handleSubmit}  style={{ backgroundColor: "rgb(182, 242, 177)", color: "black", padding: "10px", borderRadius: "5px", marginRight: "10px" }}> 
          Сохранить 
        </button>  */}
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