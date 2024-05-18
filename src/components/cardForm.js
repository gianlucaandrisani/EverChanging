import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input'; // Import the Input component
import '../CardForm.css';
import Button from './Button';
import arrowIcon from '../icons/ArrowUp.svg';
import '../textarea.css';

const CardForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isTitleFilled, setIsTitleFilled] = useState(false); // Track if title is filled

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    setIsTitleFilled(newTitle.trim() !== ''); // Update isTitleFilled based on new title
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(title, description);
    setTitle(''); // Clear title input
    setDescription(''); // Clear description input
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
    </div>
  );
};

CardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default CardForm;
