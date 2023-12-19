import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Signup() {
    const [credentials,setcredentials] = useState({name:"",email:"",password:"",location:""})
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/createuser`,{
                method:'POST',
                credentials: 'include',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.location}),
            })
            const json=await response.json();
            if(!json.success){
                alert("Enter Valid Credentials");
            }else{
                alert("Account Succesfully Created");
            }
        } catch (error) {
            console.log(error);
        }

    }
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <div>
        <div><Navbar></Navbar></div>
        <div className='container mt-5'>

        <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}  />
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
      <label htmlFor="exampleInputPassword1" className="form-label">Location</label>
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
