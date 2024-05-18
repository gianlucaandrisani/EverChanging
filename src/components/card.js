import React from 'react';
import PropTypes from 'prop-types';
import '../Card.css'
import Button from './Button';
import deleteIcon from '../icons/delete.svg'

const Card = ({ title, content, onDelete }) => {

  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="card-wrapper">
        <div className="card">
          <div className ="card-header">
            {title && <h2 className="card-title">{title}</h2>}
            <Button icon={deleteIcon} className="link" onClick={handleDelete}/>
          </div>
        {content && <p className="card-description">{content}</p>}
        </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};

export default Card;
