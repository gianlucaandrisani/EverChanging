import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import deleteIcon from '../icons/delete.svg';
import saveIcon from '../icons/Save.svg';
import arrowRight from '../icons/ArrowRight.svg';
import '../ExpandedView.css';
import Input from './Input';
import "../textarea.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CloseIcon from '../icons/Close.svg';
import { parse, format, isValid } from 'date-fns';

const ExpandedView = ({ task, onClose, onDelete, onUpdate, onToggleComplete, completed }) => {
  const [editTitle, setEditTitle] = useState(task.title);
  const [editContent, setEditContent] = useState(task.description); // Ensure description is used
  const initialDate = task.dueDate ? parse(task.dueDate, 'dd/MM', new Date()) : null;
  const [editDueDate, setEditDueDate] = useState(isValid(initialDate) ? initialDate : null);
  const textAreaRef = useRef(null);

  const handleSaveClick = () => {
    const formattedDueDate = editDueDate ? format(editDueDate, 'dd/MM') : '';
    onUpdate(task.id, editTitle, editContent, formattedDueDate);
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ' && textAreaRef.current.value.endsWith('-')) {
      event.preventDefault();
      const cursorPosition = textAreaRef.current.selectionStart;
      const newText = `${textAreaRef.current.value.slice(0, cursorPosition - 1)}• ${textAreaRef.current.value.slice(cursorPosition)}`;
      setEditContent(newText);
      setTimeout(() => {
        textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = cursorPosition + 1;
      }, 0);
    } else if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
      event.preventDefault();
      const { selectionStart, selectionEnd } = textAreaRef.current;
      const selectedText = textAreaRef.current.value.slice(selectionStart, selectionEnd);
      const newText = `${textAreaRef.current.value.slice(0, selectionStart)}**${selectedText}**${textAreaRef.current.value.slice(selectionEnd)}`;
      setEditContent(newText);
      setTimeout(() => {
        textAreaRef.current.selectionStart = selectionStart;
        textAreaRef.current.selectionEnd = selectionEnd + 4;
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
    <div className="wrapper">
      <div className="expanded-view">
        <div className="header-and-close">
          <div className="expanded-header">
            <Input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Title"
              variant="title"
            />
            <DatePicker
              selected={editDueDate}
              onChange={(date) => setEditDueDate(date)}
              dateFormat="dd/MM"
              placeholderText="dd/mm"
            />
          </div>
          <Button onClick={onClose} className="no-bg" icon={CloseIcon}/>
        </div>
        <textarea
          value={editContent}
          ref={textAreaRef}
          onChange={(e) => setEditContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Description"
          className="textarea-edit"
        />
        <div className='footer'>
          <label className="checkbox-label">
            Mark as completed
            <input type="checkbox" checked={completed} onChange={onToggleComplete} />
          </label>
          <Button text="Delete" className="action-nobg" onClick={() => { onDelete(task.id); onClose(); }} />
          <Button text="Save" className="action" onClick={handleSaveClick} />
        </div>
      </div>
    </div>
  );
};

ExpandedView.propTypes = {
  task: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default ExpandedView;
