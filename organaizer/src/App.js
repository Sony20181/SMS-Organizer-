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
import moment from 'moment';
import 'moment/locale/ru';
Modal.setAppElement('#root');

function App() {  
    
  const [currentDate, setCurrentDate] = useState(new Date());  
  const [selectedDay, setSelectedDay] = useState(new Date().getDate()); 
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [modalIsOpenEventInfo, setModalIsOpenEventInfo] = useState(false); 
  const [events, setEvents] = useState([]);

  useEffect(() => {
      fetch('http://95.106.139.183:8080/events/1?skip=0&limit=100')
         .then((response) => response.json())
         .then((data) => {
            console.log("DATA events",data);
            setEvents(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);
 
 const addEvent = async (events) => {
  console.log(typeof  events.eventStartTime);
 
  await fetch('http://95.106.139.183:8080/events', {
     method: 'POST',
     body: JSON.stringify({
        id: Math.random().toString(36).slice(2),
        title: events.eventName,
        description: events.eventDescription,
        event_date:`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`,
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
        {/**     console.log("datаааааa",data)
       setEvents((prevEvents) => {
          return { ...prevEvents, [data.event_date]: [...(prevEvents[data.event_date] || []), data] };
      }); */}
     setEvents((posts) => [data, ...posts]);
     })
     .catch((err) => {
        console.log(err.message);
     });
};


  const handleFormSubmit = (data) => {
    const day = selectedDay;
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`; 
   
   /* setEvents(prevData => ({
      ...prevData,
      [key]: [...(prevData[key] || []), data],
    }));*/
    setEvents((posts) => [data, ...posts]);
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

  function getFormattedDate(currentDate, day) {
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); 
    const formattedDay = ('0' + day).slice(-2); 
    return `${year}-${month}-${formattedDay}`;
  }
  /*
const deletePost = async (id) => {
  await fetch(`http://95.106.139.183:8080/events/${id}`, {
     method: 'DELETE',
  }).then((response) => {
     if (response.status === 200) {
        setPosts(
          setEvents.filter((post) => {
              return post.id !== id;
           })
        );
     } else {
        return;
     }
  });
  };*/
 
  const Events = [    
    { id: 12, title: '12', description: '2defe', event_date: '2024-03-04', time_start: '12:12:00' },   
    { id: 13, title: '122', description: '3434', event_date: '2024-03-04', time_start: '12:12:00' }, 
    { id: 13, title: '122', description: '3434', event_date: '2024-03-04', time_start: '12:12:00' },    
    { id: 13, title: '122', description: '3434', event_date: '2024-03-24', time_start: '12:12:00' },    
    { id: 13, title: '122', description: '3434', event_date: '2024-03-24', time_start: '12:12:00' },        
    { id: 30, title: 'cdscsd', description: 'sd', event_date: '2024-03-24', time_start: '03:23:00' }
  ];
  
  // Сортировкае массива объектов по event_date
  const sortedEvents = Events.sort((a, b) => a.event_date.localeCompare(b.event_date));
  
  // Группировка объектов по event_date
  const EventsByDate = sortedEvents.reduce((prev, curr) => {
    prev[curr.event_date] = prev[curr.event_date] || [];
    prev[curr.event_date].push(curr);
    return prev;
  }, {});
  
  console.log("EventsByDate",EventsByDate, EventsByDate[`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`]);
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
            <p className="days-names-grid">{moment(currentDate).date(day + 1).format("dd")}</p> 
            <div className="day-content">
              <h3>{day + 1}</h3> 
               {/** {events[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day+1}`]?.length > 0 &&
                <TbSquareRoundedChevronDownFilled onClick={() => openModalEventInfo()} />
              } 
               {events[events.event_date]?.length > 0 &&
                <TbSquareRoundedChevronDownFilled onClick={() => openModalEventInfo()} />
              }
              {events[`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${(day+1).toString().padStart(2, '0')}`]?.length > 0 &&
                <TbSquareRoundedChevronDownFilled onClick={() => openModalEventInfo()} />
              }
               {events.find(item => item.event_date === getFormattedDate(currentDate, day + 1)) && (
                   <TbSquareRoundedChevronDownFilled onClick={() => openModalEventInfo()} />
               )}*/}
               {EventsByDate[`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${(day+1).toString().padStart(2, '0')}`]?.length > 0 &&
                <TbSquareRoundedChevronDownFilled onClick={() => openModalEventInfo()} />
              }
            </div>
        
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
          eventData={EventsByDate[`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`]}
        />
    </Modal>  
   
  </div>  
  );  
}  
  
export default App;