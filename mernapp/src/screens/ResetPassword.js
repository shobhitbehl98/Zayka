// ResetPassword.js
import React, { useState } from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import Footer from '../components/Footer';

const ResetPassword = () => {
    const { token } = useParams();  
    const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const handleCloseErrorAlert = () => {
    setShowErrorAlert(false);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate('/login')
  };
  const handleResetPassword = async () => {
    // Call the backend API to reset the password
    console.log(token);
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const result = await response.json();
    if(result.status==200){
        setShowAlert(true);
    }else{
        setShowErrorAlert(true);
    }
  };

  return (
    <div className='m-3'>
      <h2 className='mb-3'>Reset Password</h2>
      <input type="password" placeholder="Enter your new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button className='ms-3' onClick={handleResetPassword}>Submit</button>
      
      {showAlert && (
        <Alert
          message="Password changed"
          onClose={handleCloseAlert}
        />
      )}
      {showErrorAlert && (
        <Alert
          message="Error: Password not changed"
          onClose={handleCloseErrorAlert}
        />
      )}
      <div className='fixed-bottom'><Footer></Footer></div>
    </div>
  );
};

export default ResetPassword;
