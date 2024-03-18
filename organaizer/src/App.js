import logo from './logo.svg';
import './App.css';
import Organizer from './Organaizer';
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { useState } from 'react';
import Modal from 'react-modal';


Modal.setAppElement('#root');
/*
function App() {  
    
  const [currentDate, setCurrentDate] = useState(new Date());  
  const [tasks, setTasks] = useState({}); 
  const [selectedDay, setSelectedDay] = useState(new Date().getDate()); 
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
  const handleSelectDay = (day) => { 
    setSelectedDay(day); 
  }; 
  const openModal = () => { 
    setModalIsOpen(true); 
  }; 
   
  const closeModal = () => { 
    setModalIsOpen(false); 
  }; 
 const addTask = (day, task) => {   
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;   
    const newTask = { 
      title: task, 
      description: '', 
      startTime: '', 
      endTime: '' 
    }; 
    setTasks(prevTasks => {   
      return {   
        ...prevTasks,   
        [key]: [...(prevTasks[key] || []), newTask]   
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
    
    const saveTask = () => {  
      const title = document.querySelector('input:nth-of-type(1)').value;  
      const description = document.querySelector('input:nth-of-type(2)').value;  
      const startTime = document.querySelector('input:nth-of-type(3)').value;  
      const endTime = document.querySelector('input:nth-of-type(4)').value;  
      addTask(selectedDay, { title, description, startTime, endTime });  
      closeModal();  
    }; 
  
    console.log(tasks) 

  
  
    return (  
    <div className="calendar">  
  
    <div className="month-header">  
      <button onClick={handlePrevMonth}>Назад</button>  
      <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>  
      <button onClick={handleNextMonth}>Вперед</button>  
    </div>  
  
    <IoMdAdd className="Add-Task" onClick={openModal} /> 
    <Modal 
      isOpen={modalIsOpen} 
      onRequestClose={closeModal} 
    > 
     <h2>{currentDate.toLocaleString('default', { month: 'long' })} {selectedDay}, {currentDate.getFullYear()}</h2>  
  <input type="text" placeholder="Введите название задачи" />  
  <input type="text" placeholder="Введите описание задачи" />  
  <input type="time" placeholder="Время начала" />  
  <input type="time" placeholder="Время окончания" />  
  <button onClick={closeModal}>Закрыть</button>  
  <button onClick={saveTask}>Сохранить</button>  
    </Modal> 
 
    <div className="days-grid">  
      {[...Array(daysInMonth(currentDate)).keys()].map(day => (  
        <div key={day} className={`day ${day + 1 === selectedDay ? 'selected' : ''} `} onClick={() => handleSelectDay(day + 1)}>  
          <h3>{day + 1}</h3>  
          {tasks[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day + 1}`] && tasks[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day + 1}`].map((task, index) => (  
  <div key={index}>  
    <span>{task.title}</span>  
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

function App() {  
   
  const [currentDate, setCurrentDate] = useState(new Date());  
  const [tasks, setTasks] = useState({});  
  const [selectedDay, setSelectedDay] = useState(new Date().getDate()); 
  const [modalIsOpen, setModalIsOpen] = useState(false); 
 
  // вычисляет количество дней в текущем месяце
  const daysInMonth = (date) => {  
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();  
  };  
  // навигации по месяцам
  const handlePrevMonth = () => {  
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));  
  };  
  
  const handleNextMonth = () => {  
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));  
  };  
  //выбор дня
  const handleSelectDay = (day) => { 
    setSelectedDay(day); 
  }; 
  //открытие/закрытие модального окна для добавления новых задач
  const openModal = () => { 
    setModalIsOpen(true); 
  }; 
   
  const closeModal = () => { 
    setModalIsOpen(false); 
  }; 

  // функции addTask, deleteTask, saveTask добавляют, удаляют и сохраняют задачи на выбранный день.
  const addTask = (day, task) => {  
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;  
    console.log(key)
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
  const saveTask = () => { 
    const task = document.querySelector('input').value; 
    addTask(selectedDay, task); 
    closeModal(); 
  }; 
 
  
 
 
  
  return (  
    <div className="calendar">  
 
    <div className="month-header">  
      <button onClick={handlePrevMonth} className="HeaderButton">Назад</button>  
      <h2 className="HeaderMonth" >{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>  
      <button onClick={handleNextMonth} className="HeaderButton">Вперед</button>  
    </div>  
 
    <IoMdAdd className="Add-Task" onClick={openModal} /> 
    <Modal 
      isOpen={modalIsOpen} 
      onRequestClose={closeModal} 
    > 
      <h2>{currentDate.toLocaleString('default', { month: 'long' })} {selectedDay}, {currentDate.getFullYear()}</h2> 
      <input type="text" placeholder="Введите задачу" /> 
      <button onClick={closeModal}>Закрыть</button> 
      <button onClick={saveTask}>Сохранить</button> 
    </Modal> 
 
 
 
    <div className="days-grid">  
      {[...Array(daysInMonth(currentDate)).keys()].map(day => (  
        <div key={day} className={`day ${day + 1 === selectedDay ? 'selected' : ''} `} onClick={() => handleSelectDay(day + 1)}> 
         <h3>{day + 1}</h3>  
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
  
export default App;