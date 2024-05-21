import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { parse, format } from 'date-fns'; // Import date-fns functions
import '../Card.css';
import Button from './Button';
import deleteIcon from '../icons/delete.svg';
import editIcon from '../icons/Edit.svg';
import arrowRight from '../icons/ArrowRight.svg';
import Input from './Input'; // Assuming you have an Input component
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import default styles
import '../datePicker.css'; // Import your custom styles

const Card = ({ title, content, dueDate, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  // Parse the due date correctly using date-fns
  const parsedDueDate = dueDate ? parse(dueDate, 'dd/MM', new Date()) : null;
  const [editDueDate, setEditDueDate] = useState(parsedDueDate);

  const handleDelete = () => {
    onDelete();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const formattedDueDate = editDueDate ? format(editDueDate, 'dd/MM') : '';
    onUpdate(editTitle, editContent, formattedDueDate);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditTitle(title);
    setEditContent(content);
    setEditDueDate(parsedDueDate);
  };

  return (
      <div className="card">
        {isEditing ? (
          <div className='contents'>
          <div className='title-description'>
                <Input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                  variant="title"
                />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Description"
                className='textarea'
              />
            </div>
            <div className="date-container">
              <DatePicker
                selected={editDueDate}
                onChange={(date) => setEditDueDate(date)}
                dateFormat="dd/MM"
                placeholderText="dd/mm"
                isClearable
              />
            </div>
              <div className="button-container">
                <Button className="special" text="Cancel" onClick={handleCancelClick} />
                <Button className="special" text="Update" onClick={handleSaveClick} />
              </div>
          </div>
        ) : (
          <div className='contents'>
            <div className='title-description'>
              <div className="card-header">
                {title && <h2 className="card-title">{title}</h2>}
                <div className="card-actions">
                <Button icon={editIcon} className="link" onClick={handleEditClick} />
                <Button icon={deleteIcon} className="link" onClick={handleDelete} />
                </div>
              </div>
              {content && <p className="card-description">{content}</p>}
            </div>
            <div className='date-wrapper'>
              {dueDate && (
                <div className="card-date">
                  <img src={arrowRight} alt="Due Date Icon" className="date-icon" />
                  <p>{dueDate}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  dueDate: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired, // Add onUpdate to propTypes
};

export default Card;
