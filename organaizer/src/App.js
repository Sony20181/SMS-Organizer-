import logo from './logo.svg';
import './App.css';
import Organizer from './Organaizer';
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { useState,useEffect  } from 'react';
import Modal from 'react-modal';
import EventForm from './Form';
import EventInfo from './EventInfo';
import { TbSquareRoundedChevronDownFilled } from "react-icons/tb";
Modal.setAppElement('#root');


function App() {  
    
  const [currentDate, setCurrentDate] = useState(new Date());  
  const [selectedDay, setSelectedDay] = useState(new Date().getDate()); 
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [modalIsOpenEventInfo, setModalIsOpenEventInfo] = useState(false); 
  const [events, setEvents] = useState(
    {});
    /*
    const [user, setUsers] = useState(
      []);
  useEffect(() => {
    fetch('http://95.106.139.183:8080/events')
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setUsers(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, []);*/
 /*const getEvent = async () => {
  await fetch('http://95.106.139.183:8080/events')
  .then((response) => response.json())
       .then((data) => {
          console.log(data);
          setUsers(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
}; */
console.log("events", events)

 const addEvent = async (events) => {
  console.log(typeof  events.eventStartTime);
 
  await fetch('http://95.106.139.183:8080/events', {
     method: 'POST',
     body: JSON.stringify({
        id: Math.random().toString(36).slice(2),
        title: events.eventName,
        description: events.eventDescription,
        event_date:`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`,
        time_start:events.eventStartTime,
        time_end: events.eventEndTime,
        owner_id: 1
       
     }),
     headers: {
        'Content-type': 'application/json; charset=UTF-8',
     },
  })
     .then((response) => response.json())
     .then((data) => {
        console.log("data",data)
        setEvents((prevEvents) => {
        return { ...prevEvents, [data.event_date]: [...(prevEvents[data.event_date] || []), data] };
      });
     })
     .catch((err) => {
        console.log(err.message);
     });
};


  const handleFormSubmit = (data) => {
    const day = selectedDay;
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`; 
   
    setEvents(prevData => ({
      ...prevData,
      [key]: [...(prevData[key] || []), data],
    }));
  };
  const updateFormData = (updatedData) => {
    const day = selectedDay;
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`; 
    setEvents(prevData => ({
    ...prevData,
    [key]: updatedData,
    }));
    };
    const handleSelectDay = (day) => { 
      setSelectedDay(day); 
    }; 
  /*не изменять */
  const daysInMonth = (date) => {  
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();  
  };  
  
  const handlePrevMonth = () => {  
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));  
    setSelectedDay("")
  };  
  
  const handleNextMonth = () => {  
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));  
    setSelectedDay("")
  };  
  
  const openModalEventForm = () => { 
    if (selectedDay) {
      setModalIsOpen(true);
    } else {
      alert("Пожалуйста, выберите дату!");
    }
  }; 
   
  const closeModalEventForm = () => { 
    setModalIsOpen(false); 
  }; 
  const openModalEventInfo = () => { 
   
    setModalIsOpenEventInfo(true);
   
  }; 
   
  const closeModalEventInfo = () => { 
    setModalIsOpenEventInfo(false); 
  }; 


 
  
    return (  
    <div className="calendar">  
  
    <div className="month-header">  
      <button onClick={handlePrevMonth} className="HeaderButton">Назад</button>  
      <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>  
      <button onClick={handleNextMonth} className="HeaderButton">Вперед</button>  
    </div>  
  
    <IoMdAdd className="Add-Task" onClick={openModalEventForm} /> 
    <Modal 
      isOpen={modalIsOpen} 
      onRequestClose={closeModalEventForm} 
    > 
      <h2>{currentDate.toLocaleString('default', { month: 'long' })} {selectedDay}, {currentDate.getFullYear()}</h2>  
      <EventForm 
          onFormSubmit={addEvent} 
          closeModal= {closeModalEventForm} 
          selectedDay = {selectedDay}
        />
    </Modal> 
 
     <div className="days-grid">  
      {[...Array(daysInMonth(currentDate)).keys()].map(day => (  
          <div key={day} className={`day ${day + 1 === selectedDay ? 'selected' : ''} `} onClick={() => handleSelectDay(day + 1)}>  
            <h3>{day + 1}</h3>  
             {events[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day+1}`]?.length > 0 &&
                <TbSquareRoundedChevronDownFilled onClick={() => openModalEventInfo()} />
              } 
            {/**   {events[events.event_date]?.length > 0 &&
                <TbSquareRoundedChevronDownFilled onClick={() => openModalEventInfo()} />
              }*/}
          </div>  
        ))}  
    </div>
    <Modal  
        isOpen={modalIsOpenEventInfo} 
        onRequestClose={closeModalEventInfo} 
      > 
        <h2>{currentDate.toLocaleString('default', { month: 'long' })} {selectedDay}, {currentDate.getFullYear()}</h2>  
        <EventInfo 
          onFormSubmit={updateFormData} 
          closeModal={closeModalEventInfo} 
          eventData={events[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`]}
        />
    </Modal>  
   
  </div>  
  );  
}  
  
export default App;
