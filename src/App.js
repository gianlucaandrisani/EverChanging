// App.jsx
import React, { useState } from 'react';
import './App.css';
import StatusBar from './components/StatusBar';
import CardForm from './components/cardForm';
import Card from './components/card';
import EmpyStateImage from './icons/EmptyState.svg'

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (title, description) => {
    const newTask = { title, description, completed: false };
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="app-container">
      {tasks.length === 0 ? (
        <div className="empty-state">
          <img src={EmpyStateImage}/>
          <p>No tasks added yet</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task, index) => (
            <Card key={index} title={task.title} content={task.description} />
          ))}
        </div>
      )}
      <StatusBar onAddTask={handleAddTask} />
    </div>
  );
};

export default App;
