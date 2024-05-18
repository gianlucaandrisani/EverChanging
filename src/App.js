import React, { useState } from 'react';
import './App.css';
import StatusBar from './components/StatusBar';
import Card from './components/card';
import EmpyStateImage from './icons/EmptyState.svg';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (title, description) => {
    const newTask = { title, description, completed: false };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_ , i) => i !== index); 
    setTasks(newTasks);
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <div className="empty-state">
          <img src={EmpyStateImage} alt="No tasks" />
          <p>No tasks added yet</p>
        </div>
      ) : (
        <div className="task-list">
          {tasks.map((task, index) => (
            <Card 
              key={index} 
              index={index}
              title={task.title} 
              content={task.description} 
              onDelete={() => handleDeleteTask(index)} 
            />
          ))}
        </div>
      )}
      <StatusBar tasks={tasks} onAddTask={handleAddTask} />
    </div>
  );
};

export default App;
