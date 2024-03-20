import logo from './logo.svg';
import './App.css';
import Organizer from './Organaizer';
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { useState } from 'react';
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
  console.log(new Date())
  const [formData, setFormData] = useState({});
 
  const handleFormSubmit = (data) => {
    const day = selectedDay;
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`; 
  
    setFormData(prevData => ({
      ...prevData,
      [key]: [...(prevData[key] || []), data],
    }));
  };
  console.log('formData:', formData);
  
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
  const handleSelectDay = (day) => { 
    setSelectedDay(day); 
  }; 
  const openModal = () => { 
    if (selectedDay) {
      setModalIsOpen(true);
    } else {
      alert("Пожалуйста, выберите дату!");
    }
  }; 
   
  const closeModal = () => { 
    setModalIsOpen(false); 
  }; 
  const openModalEventInfo = () => { 
   
    setModalIsOpenEventInfo(true);
   
  }; 
   
  const closeModalEventInfo = () => { 
    setModalIsOpenEventInfo(false); 
  }; 

  //new 
  const handleEditEvent = (editedEvent) => {
 /*   setFormData(eventsData.map(event => {
        if (event.id === editedEvent.id) {
            return { ...event, ...editedEvent };
        }
        return event;
    }));*/
};
  
  
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
      <EventForm 
          onFormSubmit={handleFormSubmit} 
          closeModal= {closeModal} 
       
        />
    </Modal> 

    
 
     <div className="days-grid">  
      {[...Array(daysInMonth(currentDate)).keys()].map(day => (  
          <div key={day} className={`day ${day + 1 === selectedDay ? 'selected' : ''} `} onClick={() => handleSelectDay(day + 1)}>  
            <h3>{day + 1}</h3>  
            {formData[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day+1}`] && formData[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day+1}`].map((event, index) => (
  <TbSquareRoundedChevronDownFilled key={index} onClick={() => openModalEventInfo(event)} />
))}

          </div>  
        ))}  
    </div>
    <Modal 
      isOpen={modalIsOpenEventInfo} 
      onRequestClose={closeModalEventInfo} 
    > 
      <h2>{currentDate.toLocaleString('default', { month: 'long' })} {selectedDay}, {currentDate.getFullYear()}</h2>  
      <EventInfo 
        onFormSubmit={handleFormSubmit} 
        closeModal={closeModalEventInfo} 
        eventData={formData[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`]}
        onEdit={handleEditEvent}
      />
    </Modal>   
  </div>  
  );  
}  
  
export default App;
/*
function App() {  
    
  const [currentDate, setCurrentDate] = useState(new Date());  
  const [selectedDay, setSelectedDay] = useState(new Date().getDate()); 
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [modalIsOpenEventInfo, setModalIsOpenEventInfo] = useState(false); 
  console.log(new Date())
  const [formData, setFormData] = useState({});
 
  const handleFormSubmit = (data) => {
    const day = selectedDay
    const key = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`; 
    setFormData(prevData => ({
      ...prevData,
      [key]: data,
    }));
  };
  console.log('formData:', formData);
  
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
  const handleSelectDay = (day) => { 
    setSelectedDay(day); 
  }; 
  const openModal = () => { 
    if (selectedDay) {
      setModalIsOpen(true);
    } else {
      alert("Пожалуйста, выберите дату!");
    }
  }; 
   
  const closeModal = () => { 
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
      <EventForm 
          onFormSubmit={handleFormSubmit} 
          closeModal= {closeModal} 
       
        />
    </Modal> 

    
 
     <div className="days-grid">  
      {[...Array(daysInMonth(currentDate)).keys()].map(day => (  
          <div key={day} className={`day ${day + 1 === selectedDay ? 'selected' : ''} `} onClick={() => handleSelectDay(day + 1)}>  
            <h3>{day + 1}</h3>  
            {formData[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day+1}`] && (
              <TbSquareRoundedChevronDownFilled onClick={() => openModalEventInfo()} />
            )}

          </div>  
        ))}  
    </div>
    <Modal 
      isOpen={modalIsOpenEventInfo} 
      onRequestClose={closeModalEventInfo} 
    > 
      <h2>{currentDate.toLocaleString('default', { month: 'long' })} {selectedDay}, {currentDate.getFullYear()}</h2>  
      <EventInfo 
        onFormSubmit={handleFormSubmit} 
        closeModal={closeModalEventInfo} 
        eventData={formData[`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`]}
      />
    </Modal>   
  </div>  
  );  
}  
  
export default App;
*/

/*
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
  
export default App;*/