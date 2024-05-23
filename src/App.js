import React, { useState, useEffect } from 'react';
import './App.css';
import StatusBar from './components/StatusBar';
import Card from './components/card';
import EmpyStateImage from './icons/EmptyState.svg';

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (title, description, dueDate) => {
    const newTask = { title, description, dueDate, completed: false };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleUpdateTask = (index, newTitle, newContent, newDueDate) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, title: newTitle, description: newContent, dueDate: newDueDate } : task
    );
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
              title={task.title}
              content={task.description}
              dueDate={task.dueDate}
              onDelete={() => handleDeleteTask(index)}
              onUpdate={(newTitle, newContent, newDueDate) => handleUpdateTask(index, newTitle, newContent, newDueDate)}
            />
          ))}
        </div>
      )}
      <StatusBar tasks={tasks} onAddTask={handleAddTask} />
    </div>
  );
};

export default App;
