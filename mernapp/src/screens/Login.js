import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Alert from '../components/Alert';

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  useEffect(()=>{
   checklogin()
  },[])
  const handleShowAlert = () => {
    setShowAlert(true)
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate('/');

  };
  const checklogin = ()=>{
    if(localStorage.getItem("authToken")){
     handleShowAlert()
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      })
      const json = await response.json({});
      if (!json.success) {
        alert("Enter Valid Credentials");
      }
      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("location", json.location);
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }

  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (

    <div>
      <div><Navbar></Navbar></div>
      <div>
        <div className='container mt-5'>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
            </div>
            <div className='mt-5'>
            <button type="submit" className="btn btn-success me-3 ">Submit</button>
            <Link to='/signup' type="submit" className="btn btn-danger me-3">I am a new user</Link>
            <Link to='/forgotpassword' type="submit" className="btn btn-info me-3">Forgot Password</Link>
            </div>
          </form>
        </div>
      </div>
      <div>
            {showAlert && (
        <Alert
          message="Already Logged in"
          time='500'
          onClose={handleCloseAlert}
        />
      )}
        </div>
      <div className='fixed-bottom'><Footer></Footer></div>
    </div>
  )
}
