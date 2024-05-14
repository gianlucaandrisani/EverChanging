// CardForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from './Input'; // Import the Input component
import '../CardForm.css'
import Button from './Button';
import arrowIcon from '../icons/ArrowUp.svg'
import '../textarea.css'

const CardForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(title, description);
    setTitle(''); // Clear title input
    setDescription(''); // Clear description input
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
        <Button icon={arrowIcon} className="secondary"/>
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
