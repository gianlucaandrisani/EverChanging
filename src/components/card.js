import React from 'react';
import PropTypes from 'prop-types';
import '../Card.css'

const Card = ({ title, content }) => {
  return (
    <div className="card-wrapper">
        <div className="card">
        {title && <h2 className="card-title">{title}</h2>}
        {content && <p className="card-description">{content}</p>}
        </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default Card;
