import React from "react";
import PropTypes from "prop-types";
import '../StatusBar.css';

const Tab = ({ text, icon, onClick, disabled, className }) => {
    return (
        <div className={`tab ${className}`} onClick={onClick} disabled={disabled}>
          {icon && <img src={icon} alt="icon" />} {/* Use img tag to display the icon */}
          {text && <span>{text}</span>}
        </div>
      );
};

Tab.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string, // Assuming icon is a URL
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string // className prop for adding variants
};  

export default Tab;
