import React, { useState, useRef, useEffect } from 'react';
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
  const textAreaRef = useRef(null);

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

  const handleKeyDown = (event) => {
    if (event.key === ' ' && textAreaRef.current.value.endsWith('-')) {
      event.preventDefault();
      const cursorPosition = textAreaRef.current.selectionStart;
      const newText = `${textAreaRef.current.value.slice(0, cursorPosition - 1)}• ${textAreaRef.current.value.slice(cursorPosition)}`;
      setDescription(newText);
      setTimeout(() => {
        textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = cursorPosition + 1;
      }, 0);
    } else if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
      event.preventDefault();
      const { selectionStart, selectionEnd } = textAreaRef.current;
      const selectedText = textAreaRef.current.value.slice(selectionStart, selectionEnd);
      const newText = `${textAreaRef.current.value.slice(0, selectionStart)}<b>${selectedText}</b>${textAreaRef.current.value.slice(selectionEnd)}`;
      setDescription(newText);
      setTimeout(() => {
        textAreaRef.current.selectionStart = selectionStart;
        textAreaRef.current.selectionEnd = selectionEnd + 7; // 7 characters added for <b></b>
      }, 0);
    }
  };

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (textArea) {
        textArea.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

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
        <DatePicker
            selected={dueDate}
            onChange={handleDueDateChange}
            dateFormat="dd/MM"
            placeholderText="dd/mm"
          />
      <textarea
        ref={textAreaRef}
        className="textarea-form"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Description"
      />
    </div>
  );
};

CardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CardForm;
