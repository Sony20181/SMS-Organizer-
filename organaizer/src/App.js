
import './App.css';
import { IoMdAdd } from "react-icons/io";
import { useState,useEffect  } from 'react';
import Modal from 'react-modal';
import EventForm from './Form';
import EventInfo from './EventInfo';
import { TbSquareRoundedChevronDownFilled } from "react-icons/tb";
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ru';
import { ModalErrorDataBase } from './ModalErrorDataBase';

Modal.setAppElement('#root');

function App() {  
 

  const address = "82.140.216.9"
 // const address = "localhost"
  const [currentDate, setCurrentDate] = useState(new Date());  
  const [selectedDay, setSelectedDay] = useState(new Date().getDate()); 
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [modalIsOpenEventInfo, setModalIsOpenEventInfo] = useState(false); 
  const [events, setEvents] = useState([]);
  const [modalErrorDataBase, setModalErrorDataBase] = useState(false);



  const closeModalErrorDataBase = () => {
    setModalErrorDataBase(false);
  };
  useEffect(() => {
    
      fetch(`http://${address}:8080/events`)
         .then((response) => response.json())
         .then((data) => {
           
            setEvents(data);
         })
         .catch((err) => {
         // alert("ERROR")
            console.log(err.message);
            setModalErrorDataBase(true);
         });
   }, []);
 
  const addEvent = async (events) => {
    await fetch(`http://${address}:8080/events`, {
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
        
       
      setEvents((posts) => [data, ...posts]);
      })
      .catch((err) => {
          console.log(err.message);
          setModalErrorDataBase(true);
      });
  };
  const deleteEvent = async (id) => {
    await fetch(`http://${address}:8080/events/${id}`, {
      method: 'DELETE',
    }).then((response) => {
      if (response.status === 200) {
        setEvents(
          events.filter((post) => {
                return post.id !== id;
            })
          );
      } else {
          return;
      }
    })
  
    };
 
  const handleSelectDay = (day) => { 
    setSelectedDay(day); 
  }; 
  const daysInMonth = (date) => {  
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();  
  };  
  
  const getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  const handlePrevMonth = () => {  
 
  const prevMonth = currentDate.getMonth() - 1;
  let newYear = currentDate.getFullYear();
  let newMonth = prevMonth;

  if (prevMonth < 0) {
    newYear -= 1;
    newMonth = 11; 

    if (newYear < 1900) {
      setSelectedMonth(0)
      setSelectedYear(1900)
      setCurrentDate(new Date(1900, 0));
      return;
    }
  }
  const lastDayOfMonth = getLastDayOfMonth(newYear, newMonth);
  const newDay = Math.min(selectedDay, lastDayOfMonth);
  setSelectedDay(newDay); 
  setSelectedMonth(newMonth)
  setSelectedYear(newYear)
  setCurrentDate(new Date(newYear, newMonth));
  };  
  
  
  const handleNextMonth = () => {  
   // setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));  
   // setSelectedDay("")
   const nextMonth = currentDate.getMonth() + 1;
   let newYear = currentDate.getFullYear();
   let newMonth = nextMonth;
   if (nextMonth > 11) {
     newYear += 1;
     newMonth = 0; 
     
    if (newYear > 9999) {
      setSelectedMonth(11)
      setSelectedYear(9999)
      setCurrentDate(new Date(9999, 11));
      return;
    }
   }
   const lastDayOfMonth = getLastDayOfMonth(newYear, newMonth);
   const newDay = Math.min(selectedDay, lastDayOfMonth);
   setSelectedDay(newDay); 
   setSelectedMonth(newMonth)
   setSelectedYear(newYear)
   setCurrentDate(new Date(newYear, newMonth));

  };  
  const getFirstDayOfWeek = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;
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
 
  const sortedEvents = events.sort((a, b) => a.event_date.localeCompare(b.event_date));
  const EventsByDate = sortedEvents.reduce((prev, curr) => {
    prev[curr.event_date] = prev[curr.event_date] || [];
    prev[curr.event_date].push(curr);
    return prev;
  }, {});
  
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const handleSelectMonthYear = (month, year) => {
    setCurrentDate(new Date(year, month));
    setSelectedMonth(month);
    setSelectedYear(year);
  };
  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  return (  
    <div className="calendar">  
      <div className="month-selector">
        <select
          className="input-month"
          value={selectedMonth}
          onChange={(e) => handleSelectMonthYear(parseInt(e.target.value), selectedYear)}
        >
          {moment.months().map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
        <input
          className="input-year"
          type="number"
          value={selectedYear}
          onChange={(e) => {
            let value = e.target.value ? parseInt(e.target.value) : ""; 
            if ( value && value.toString().length > 4) {
              value = parseInt(value.toString().slice(0, 4));
              
            }
            
            handleYearChange(value);
          }}
          onKeyUp={(e) => {
            
            if (e.key === 'Enter') {
              if (selectedYear == ""){
                setCurrentDate(new Date(selectedYear == "" ? new Date().getFullYear() : selectedYear, selectedMonth));
                return
              }
              setCurrentDate(new Date(selectedYear < 1900 ? new Date().getFullYear()  : selectedYear, selectedMonth));
            }
          }}
        />
       
      
      </div>
      <div className="month-header">  
          <button onClick={handlePrevMonth} className="HeaderButton">Назад</button>  
          <h2>{moment(currentDate).format('MMMM YYYY')}</h2>
          <button onClick={handleNextMonth} className="HeaderButton">Вперед</button>  
        </div>
   
    <IoMdAdd className="Add-Task" onClick={openModalEventForm} /> 
    <ModalErrorDataBase isOpen={modalErrorDataBase} onClose={closeModalErrorDataBase} />
    <Modal 
      isOpen={modalIsOpen} 
      onRequestClose={closeModalEventForm} 
    > 
      <h2>{currentDate.toLocaleString('default', { month: 'long' })} {selectedDay}, {currentDate.getFullYear()}</h2>  
      <EventForm 
          onFormSubmit={addEvent} 
          closeModal= {closeModalEventForm} 
          selectedDay = {`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`}
          events = {events}
        />
    </Modal> 

    <div className="days-grid">
  {[...Array(getFirstDayOfWeek(currentDate)).keys()].map(() => (
    <div key={`empty-${Math.random()}`} className="day empty"></div>
  ))}
  {[...Array(daysInMonth(currentDate)).keys()].map(day => (
    <div key={day} className={`day ${day + 1 === selectedDay ? 'selected' : ''} `} onClick={() => handleSelectDay(day + 1)}>  
      <p className="days-names-grid">{moment(currentDate).date(day + 1).format("dd")}</p>
      <div className="day-content">
          <h3>{day + 1}</h3> 
            {events.find(item => item.event_date === getFormattedDate(currentDate, day + 1)) && (
                <TbSquareRoundedChevronDownFilled onClick={() => openModalEventInfo()} />
            )}
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
          deleteEvent = {deleteEvent}
          closeModal={closeModalEventInfo} 
          eventData={EventsByDate[`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`]}
          selectedDay = {`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDay.toString().padStart(2, '0')}`}
          address ={address}
        />
    </Modal>  
   
  </div>  
  );  
}  
  
export default App; 
