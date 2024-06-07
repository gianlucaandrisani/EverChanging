import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import deleteIcon from '../icons/delete.svg';
import saveIcon from '../icons/Edit.svg';
import arrowRight from '../icons/ArrowRight.svg';
import '../ExpandedView.css';
// import { marked } from 'marked';
import Input from './Input';
import "../textarea.css";
import DatePicker from 'react-datepicker';

const ExpandedView = ({ task, onClose, onDelete, onUpdate, onToggleComplete }) => {
  const [editTitle, setEditTitle] = useState(task.title);
  const [editContent, setEditContent] = useState(task.description); // Ensure description is used
  const [editDueDate, setEditDueDate] = useState(task.dueDate);
  const textAreaRef = useRef(null);

  const handleSaveClick = () => {
    onUpdate(task.id, editTitle, editContent, editDueDate);
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
    <Button text="Close" onClick={onClose} />
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
              isClearable
            />
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
        <div className="expanded-actions">
            <Button icon={saveIcon} className="secondary" onClick={handleSaveClick} />
            <Button icon={deleteIcon} className="secondary" onClick={() => { onDelete(task.id); onClose(); }} />
            <Button icon={arrowRight} className="secondary" onClick={onToggleComplete} />
        </div>
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
