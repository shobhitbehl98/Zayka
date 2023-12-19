import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
  const [credentials,setcredentials] = useState({email:"",password:""})
  let navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email:credentials.email,password:credentials.password}),
            })
            const json=await response.json();
            if(!json.success){
                alert("Enter Valid Credentials");
            }
            if(json.success){
               localStorage.setItem("userEmail",credentials.email);
               localStorage.setItem("authToken",json.authToken);
               navigate("/")
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
       <div>
    <div className='container mt-5'>

    <form onSubmit={handleSubmit}>
<div className="mb-3">
  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-3">
  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
  <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
</div>
<button type="submit" className="btn btn-success m-3">Submit</button>
<Link to='/signup' type="submit" className="btn btn-danger m-3">I am a new user</Link>
</form>
    </div>
</div>
<div><Footer></Footer></div>
</div>
  )
}
