import './Button.css';
import React from 'react';

const Button = ({ type, children, onClick }) => {
  return (
    <button type={type} onClick={onClick} className="button">
      {children}
    </button>
  );
};

export default Button;
