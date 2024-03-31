
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
  //const adreess = "localhost"
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
            console.log("DATA events",data);
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
          console.log("data",data)
       
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
  
  const handlePrevMonth = () => {  
  //  setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));  
  //  setSelectedDay("")
   const prevMonth = currentDate.getMonth() - 1;
  let newYear = selectedYear;
  let newMonth = prevMonth;
  if (prevMonth < 0) {
    newYear -= 1;
    newMonth = 11; // December
  }
  setCurrentDate(new Date(newYear, newMonth));  
  setSelectedDay("");
  setSelectedMonth(newMonth);
  setSelectedYear(newYear);
  };  
  
  
  const handleNextMonth = () => {  
   // setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));  
   // setSelectedDay("")
   const nextMonth = currentDate.getMonth() + 1;
   let newYear = selectedYear;
   let newMonth = nextMonth;
   if (nextMonth > 11) {
     newYear += 1;
     newMonth = 0; // January
   }
   setCurrentDate(new Date(newYear, newMonth));  
   setSelectedDay("");
   setSelectedMonth(newMonth);
   setSelectedYear(newYear);

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
    let newValue = e.target.value === "" ? "" : parseInt(e.target.value);
   
    if (newValue <= 9999) {
   
      handleSelectMonthYear(selectedMonth, newValue);
    } 
  }}
 
  
  onKeyPress={(e) => { 
    if (e.key === 'Enter') { 
      const enteredYear = parseInt(e.target.value); 
      if (enteredYear < 1900) { 
        handleSelectMonthYear(selectedMonth, 1900); 
      } 
    } 
  }} 
  style={{ width: "50px", textAlign: "center" }}
/>
      </div>
      <div className="month-header">
      <button onClick={handlePrevMonth} className="HeaderButton">Назад</button> 
        <h2>{moment(currentDate).format('MMMM YYYY')}</h2>
        <button onClick={handleNextMonth} className="HeaderButton">Вперед</button>  
      </div>
   {/**  <div className="month-header">  
      <button onClick={handlePrevMonth} className="HeaderButton">Назад</button>  
      <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>  
      <button onClick={handleNextMonth} className="HeaderButton">Вперед</button>  
    </div>  */}
  
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
