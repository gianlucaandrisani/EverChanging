import React from 'react';
import PropTypes from 'prop-types';
// import { parse } from 'date-fns';
import '../Card.css';
import Button from './Button';
import deleteIcon from '../icons/delete.svg';
import arrowRight from '../icons/ArrowRight.svg';
import openIcon from '../icons/Edit.svg'; // Placeholder for open button
import { convertFromMarkdown, convertToMarkdown } from '../utils/markdownUtils';

const Card = ({ title, content, dueDate, completed, onDelete, onToggleComplete, onOpen }) => {

  return (
    <div className="card">
      <div className='contents'>
        <div className='gradient'></div>
        <div className='title-description'>
          <div className="card-header">
            {title && <h2 className="card-title">{title}</h2>}
            <div className="card-actions">
              <Button icon={openIcon} className="link" onClick={onOpen} /> {/* Placeholder for open button */}
              <Button icon={deleteIcon} className="link" onClick={onDelete} />
              <input type="checkbox" checked={completed} onChange={onToggleComplete} />
            </div>
          </div>
          {content && <div className="card-description" dangerouslySetInnerHTML={{ __html: convertFromMarkdown(content) }} />}
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
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  dueDate: PropTypes.string,
  completed: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired, // New prop for opening the expanded view
};

export default Card;
