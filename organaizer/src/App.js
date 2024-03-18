import logo from './logo.svg';
import './App.css';
import Organizer from './Organaizer';
import { AiFillCloseCircle } from "react-icons/ai";
import { useState } from 'react';

/*
function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDuration, setTaskDuration] = useState('');

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };
  const addTask = (day, task) => {
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    setTasks(prevTasks => {
      return {
        ...prevTasks,
        [key]: [...(prevTasks[key] || []), task]
      };
    });
  };
  const deleteTask = (day, index) => {
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    setTasks(prevTasks => {
      return {
        ...prevTasks,
        [key]: prevTasks[key].filter((_, i) => i !== index)
      };
    });
  };
  
  return (
    <div className="calendar">
    <div className="month-header">
      <button onClick={handlePrevMonth}>Назад</button>
      <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
      <button onClick={handleNextMonth}>Вперед</button>
    </div>
   
    <div className="days-grid">
    
      {[...Array(daysInMonth(currentDate)).keys()].map(day => (
        <div key={day} className="day" onClick={() => setSelectedDay(day + 1)}>
          <h3>{day + 1}</h3>
          {selectedDay === day + 1 &&
            <input
              className="calendarInput"
              type="text"
              placeholder="Добавить задачу"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addTask(day + 1, e.target.value);
                  e.target.value = '';
                }
              }}
            />
          }
          
          {tasks[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day + 1}`] && tasks[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day + 1}`].map((task, index) => (
            <div key={index}>
              <span>{task}</span>
              <AiFillCloseCircle onClick={() => deleteTask(day + 1, index)} />
             
            </div>
          ))} 
        </div>
      ))}
    </div>
  </div> 
  
  
  );
}

export default App;*/

import Modal from 'react-modal';


Modal.setAppElement('#root');

function App() {  
  const [currentDate, setCurrentDate] = useState(new Date());  
  const [tasks, setTasks] = useState({});  
  const [selectedDay, setSelectedDay] = useState(null);  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventInput, setEventInput] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const daysInMonth = (date) => {  
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();  
  };  
  
  const handlePrevMonth = () => {  
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));  
  };  
  
  const handleNextMonth = () => {  
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));  
  };  

  const handleSaveEvent = () => {
    addTask(selectedDay, eventInput);
    setEventInput('');
    setModalIsOpen(false);
  };

  const addTask = (day, task) => {  
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;  
    setTasks(prevTasks => {  
      return {  
        ...prevTasks,  
        [key]: [...(prevTasks[key] || []), task]  
      };  
    });  
  };  

  const deleteTask = (day, index) => {  
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;  
    setTasks(prevTasks => {  
      return {  
        ...prevTasks,  
        [key]: prevTasks[key].filter((_, i) => i !== index)  
      };  
    });  
  };  
  
  return (  
    <div className="calendar">  
      <div className="month-header">  
        <button onClick={handlePrevMonth}>Назад</button>  
        <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>  
        <button onClick={handleNextMonth}>Вперед</button>  
      </div>  
      <div className="days-grid">  
        {[...Array(daysInMonth(currentDate)).keys()].map(day => (  
          <div key={day} className="day" onClick={() => setSelectedDay(day + 1)}>  
            <h3>{day + 1}</h3>  
            {selectedDay === day + 1 &&  
              <div>
                <button onClick={() => setModalIsOpen(true)}>Заполнить форму</button>
                <button onClick={() => setSelectedEvent('events')}>События</button>
              </div>
            }
            {selectedDay === day + 1 && selectedEvent === 'events' && tasks[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day + 1}`] && tasks[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day + 1}`].map((task, index) => (  
              <div key={index}>  
                <span>{task}</span>  
                <AiFillCloseCircle onClick={() => deleteTask(day + 1, index)} />  
              </div>  
            ))}   
          </div>  
        ))}  
      </div>  
      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Fill Form Modal" 
        className="modal"
      >
        <input  
          className="calendarInput"  
          type="text"  
          placeholder="Добавить задачу"  
          value={eventInput}
          onChange={(e) => setEventInput(e.target.value)}
        />
        <button onClick={handleSaveEvent}>Сохранить</button>
        <button onClick={() => setModalIsOpen(false)}>Закрыть</button>
      </Modal>
    </div>  
  );  
}  
  
export default App;