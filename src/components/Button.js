// Button.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../Button.css'; // Import the CSS file

const Button = ({ text, icon, onClick, disabled, className }) => {
  return (
    <button className={`button ${className}`} onClick={onClick} disabled={disabled}>
            {text && <span>{text}</span>}
      {icon && <img src={icon} alt="icon" />} {/* Use img tag to display the icon */}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string, // Assuming icon is a URL
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
