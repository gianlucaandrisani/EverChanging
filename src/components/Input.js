// Input.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../Input.css'; // Import the CSS file

const Input = ({ type, value, onChange, placeholder, variant }) => {
  // Define classes based on the variant and value
  const inputClasses = ['input'];
  if (variant === 'title') {
    inputClasses.push('input-title');
  }
  if (value) {
    inputClasses.push('input-value');
  }

  return (
    <input
      className={inputClasses.join(' ')}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(['title', 'description']), // Add prop type for variant
};

Input.defaultProps = {
  variant: 'description', // Default variant is 'description'
};

export default Input;
