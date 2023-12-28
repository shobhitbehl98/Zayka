import React, { useEffect } from 'react';
import './Alert.css';

const Alert = ({ message,time, onClose }) => {
  console.log(time);
  if(!time){
    time=1300
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, time);

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
