import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import { useCart } from './ContextReducer'
import Modal from '../Modal'
import Cart from '../screens/Cart'


export default function Navbar() {
  const navigate = useNavigate()
  let data=useCart();
  const [cartView,setcartView] = useState(false);
  const handleLogout = ()=>{
    localStorage.removeItem('authToken');
    navigate('/login')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" id='navbar'>
        <div className='container-fluid'>
    <Link className="navbar-brand fs-1 fst-italic fw-bold mb-2 mx-2" to="/" >
    {process.env.REACT_APP_TITLE}
    </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item fs-5 mx-2">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {(localStorage.getItem('authToken')) ?
      <li className='nav-item fs-5'>
        <Link className='nav-link' aria-current="page" to="/myorders">My Orders</Link>
      </li>  
      :""}
      </ul>
      {(localStorage.getItem('authToken'))?
      <div className='d-flex'>
      <Link className="btn text-white fs-5" to="/cart" >My Cart
      {" "}
      <Badge pill bg='danger'>{data?.length}</Badge>
      </Link>
      {/* {cartView?<Modal onClose={()=>setcartView(false)}><Cart></Cart></Modal>:null} */}
      <div className="btn text-white fs-5" onClick={handleLogout}>Logout</div>
  </div>
      :
      <div className='d-flex'>
      <Link className="btn text-white fs-5" to="/login">Login</Link>
      <Link className="btn text-white fs-5" to="/signup">Signup</Link>
  </div>}
    </div>
    </div>
  </nav>
  </div>
  )
}
