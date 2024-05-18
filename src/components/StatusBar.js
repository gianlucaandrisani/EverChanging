import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../StatusBar.css';
import Button from './Button';
import addIcon from '../icons/add.svg';
import CardForm from './cardForm';
import Tab from './tab';
import ActiveIcon from '../icons/Active.svg';
import CompletedIcon from '../icons/Completed.svg';
import useOutsideAlerter from './useOutsideAlerter'; // Import the useOutsideAlerter hook

const StatusBar = ({ tasks, onAddTask }) => {
  const [showForm, setShowForm] = useState(false);
  const cardFormRef = useRef(null); // Create a ref for the CardForm element

  // Call the useOutsideAlerter hook
  useOutsideAlerter(cardFormRef, () => {
    setShowForm(false); // Close the form when clicked outside
  });

  const handleAddTaskClick = () => {
    setShowForm(true);
  };

  const handleSubmitTask = (title, description) => {
    onAddTask(title, description); // Call the prop function with task details
    setShowForm(false); // Hide the form after submitting
  };

  const activeTasks = tasks ? tasks.filter(task => !task.completed).length : 0;

  return (
    <div className="status-bar">
      <div className="tabs">
        <Tab text={`${activeTasks} Active`} icon={ActiveIcon} className="active" />
        <Tab text={'Completed'} icon={CompletedIcon} className="" />
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
};

export default StatusBar;
