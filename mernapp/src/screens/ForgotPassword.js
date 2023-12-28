import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ForgotPassword() {
        const [email, setEmail] = useState('');
      
        const handleForgotPassword = async () => {
          // Call the backend API to initiate the password reset
          const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/forgot-password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
      
          const result = await response.json();
          console.log(result);
        };
      
  return (
    <div>
      <div><Navbar></Navbar></div>
       <div className='m-3'>
       <h2 className='mb-4'>Forgot Password</h2>
      <input className='me-3' type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleForgotPassword}>Reset Password</button>
<div className='fixed-bottom'><Footer></Footer></div>
</div>
    </div>
  )
}

export default ForgotPassword
