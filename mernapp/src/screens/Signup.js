import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Alert from '../components/Alert'
import { useNavigate } from 'react-router-dom'
export default function Signup() {
    const [credentials,setcredentials] = useState({name:"",lastName:"",email:"",password:"",location:""})
    const [showAlert, setShowAlert] = useState(false);
    const [showSignedAlert, setShowSignedAlert] = useState(false);
    const navigate = useNavigate();
  const handleSignedShowAlert = () => {
    setShowSignedAlert(true)
  };

  const handleSignedCloseAlert = () => {
    setShowSignedAlert(false);
    navigate('/')

  };
  const handleShowAlert = () => {
    setShowAlert(true)
  };

  const handleCloseAlert = () => {
    setShowAlert(false);

  };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/createuser`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:credentials.name,lastName:credentials.lastName,email:credentials.email,password:credentials.password,location:credentials.location}),
            })
            const json=await response.json();
            if(!json.success){
                handleShowAlert()
            }else{
              localStorage.setItem("userEmail",credentials.email);
               localStorage.setItem("authToken",json.authToken);
               localStorage.setItem("location",credentials.location);
               localStorage.setItem("name",credentials.name);
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }

    }
    const checksignup = ()=>{
      if(localStorage.getItem("authToken")){
       handleSignedShowAlert()
      }
    }
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
    useEffect(()=>{
      checksignup()
     },[])
  return (
    <div>
        <div><Navbar></Navbar></div>
        {showSignedAlert && (
        <Alert
          message="Already Signed in"
          time='500'
          onClose={handleSignedCloseAlert}
        />
      )}
        <div>
            {showAlert && (
        <Alert
          message="Enter Valid Credentials"
          onClose={handleCloseAlert}
        />
      )}
        </div>
        <div className='container mt-5'>

        <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}  />
    </div>
    <div className='mb-3'>
                    <label htmlFor="lastName" className="form-label">Last Name</label>
      <input type="text" className="form-control" name='lastName' value={credentials.lastName} onChange={onChange}  />

    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
      <input type="text" className="form-control" id="exampleInputPassword1" name='location' value={credentials.location} onChange={onChange}/>
    </div>
    <button type="submit" className="btn btn-success m-3">Submit</button>
    <Link to='/login' type="submit" className="btn btn-danger m-3">Already a user</Link>
  </form>
        </div>
        <div><Footer></Footer></div>
  </div>
  )
}
