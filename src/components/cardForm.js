import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input'; // Import the Input component
import Button from './Button';
import DatePicker from 'react-datepicker';
import arrowIcon from '../icons/ArrowUp.svg';
import 'react-datepicker/dist/react-datepicker.css'; // Import default styles
import '../CardForm.css';
import '../textarea.css';
import '../datePicker.css'; // Import your custom styles

const CardForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [isTitleFilled, setIsTitleFilled] = useState(false); // Track if title is filled

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    setIsTitleFilled(newTitle.trim() !== ''); // Update isTitleFilled based on new title
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedDueDate = dueDate ? `${dueDate.getDate()}/${dueDate.getMonth() + 1}` : '';
    onSubmit(title, description, formattedDueDate); // Pass due date along with title and description
    setTitle(''); // Clear title input
    setDescription(''); // Clear description input
    setDueDate(null); // Clear due date input
    setIsTitleFilled(false); // Reset isTitleFilled
  };

  return (
    <div className="card-form">
      <form onSubmit={handleSubmit} className="form-header">
        <Input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          variant="title" // Specify variant for title input
        />
        <Button icon={arrowIcon} className="secondary" disabled={!isTitleFilled} /> {/* Disable button if title is not filled */}
      </form>
      <textarea
        className="textarea"
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Description"
      />
      <div className="date-container">
        <DatePicker
          selected={dueDate}
          onChange={handleDueDateChange}
          dateFormat="dd/MM"
          placeholderText="dd/mm"
        />
      </div>
    </div>
  );
};

CardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CardForm;
