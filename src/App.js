import React, { useState, useEffect } from 'react';
import './App.css';
import StatusBar from './components/StatusBar';
import Card from './components/Cardv1';
import ExpandedView from './components/ExpandedView';
import EmpyStateImage from './icons/EmptyState.svg';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('active');
  const [expandedTask, setExpandedTask] = useState(null); // State for expanded view

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (title, description, dueDate) => {
    const newTask = { id: uuidv4(), title, description, dueDate, completed: false };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const handleToggleCompleteTask = (id) => {
    const newTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleUpdateTask = (id, newTitle, newContent, newDueDate) => {
    const newTasks = tasks.map(task => 
      task.id === id ? { ...task, title: newTitle, description: newContent, dueDate: newDueDate } : task
    );
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter(task => (view === 'active' ? !task.completed : task.completed));

  return (
    <div>
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <img src={EmpyStateImage} alt="No tasks" />
          <p>No tasks in this view</p>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map(task => (
            <Card
              key={task.id}
              title={task.title}
              content={task.description} // Ensure description is passed correctly
              dueDate={task.dueDate}
              completed={task.completed}
              onDelete={() => handleDeleteTask(task.id)}
              onToggleComplete={() => handleToggleCompleteTask(task.id)}
              onOpen={() => setExpandedTask(task)} // Set the expanded task
            />
          ))}
        </div>
      )}
      {expandedTask && (
        <ExpandedView
          task={expandedTask}
          onClose={() => setExpandedTask(null)}
          onDelete={(id) => { handleDeleteTask(id); setExpandedTask(null); }}
          onUpdate={handleUpdateTask}
          onToggleComplete={() => handleToggleCompleteTask(expandedTask.id)}
        />
      )}
      <StatusBar tasks={tasks} onAddTask={handleAddTask} setView={setView} />
    </div>
  );
};

export default App;
