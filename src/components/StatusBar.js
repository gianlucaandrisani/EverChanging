import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../StatusBar.css';
import Button from './Button';
import addIcon from '../icons/add.svg';
import CardForm from './cardForm';
import Tab from './tab';
import ActiveIcon from '../icons/Active.svg';
import CompletedIcon from '../icons/Completed.svg';
import useOutsideAlerter from './useOutsideAlerter';

const StatusBar = ({ tasks, onAddTask, setView }) => {
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const cardFormRef = useRef(null);

  useOutsideAlerter(cardFormRef, () => {
    setShowForm(false);
  });

  const handleAddTaskClick = () => {
    setShowForm(true);
  };

  const handleSubmitTask = (title, description, dueDate) => {
    onAddTask(title, description, dueDate);
    setShowForm(false);
  };

  const handleTabClick = (view) => {
    setView(view);
    setActiveTab(view);
  };

  const activeTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="status-bar">
      <div className="tabs">
        <Tab
          text={`${activeTasks} Active`}
          icon={ActiveIcon}
          className={activeTab === 'active' ? 'active' : ''}
          onClick={() => handleTabClick('active')}
        />
        <Tab
          text={`${completedTasks} Completed`}
          icon={CompletedIcon}
          className={activeTab === 'completed' ? 'active' : ''}
          onClick={() => handleTabClick('completed')}
        />
      </div>
      <svg width="2" height="18" viewBox="0 0 2 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1V17" stroke="#2F2E2E" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <Button text={''} onClick={handleAddTaskClick} icon={addIcon} />
      {showForm && (
        <div ref={cardFormRef} className="form-container"> {/* Pass the ref to the CardForm */}
          <CardForm onSubmit={handleSubmitTask}/>
        </div>
      )}
    </div>
  );
};

StatusBar.propTypes = {
  tasks: PropTypes.array.isRequired,
  onAddTask: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired, // Add setView to propTypes
};

export default StatusBar;
