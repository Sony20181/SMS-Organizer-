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

  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  return (
    <div>
      <div>
        <button onClick={handlePrevMonth}>Previous Month</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
        <button onClick={handleNextMonth}>Next Month</button>
      </div>
      <div>
        {[...Array(daysInMonth(currentDate)).keys()].map(day => (
          <div key={day}>
            <h3>{day + 1}</h3>
            {tasks[day + 1] && tasks[day + 1].map((task, index) => (
              <div key={index}>
                <span>{task}</span>
               
              </div>
            ))}
            <input type="text" placeholder="Add a task" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
