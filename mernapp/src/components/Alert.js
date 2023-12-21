import React, { useEffect } from 'react';
import './Alert.css';

const Alert = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1300);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
