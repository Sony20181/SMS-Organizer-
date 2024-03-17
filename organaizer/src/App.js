import logo from './logo.svg';
import './App.css';
import Organizer from './Organaizer';
import { useState } from 'react';
function App() {
  {/**return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> 
    <Organizer/>

  );
<Organizer/>*/}
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);

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
              <button onClick={() => deleteTask(day + 1, index)}>Удалить</button>
            </div>
          ))}
        </div>
      ))}
     
    </div>
  </div>


  );
}

export default App;
