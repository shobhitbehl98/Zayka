import React from 'react'
import Delete from '@mui/icons-material/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <Link className='btn bg-danger fs-4' style={{ marginLeft: "90%", marginTop: "10px" }} to="/" > X </Link>
        <div className=' w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  const handleClearCart = ()=>{
    dispatch({type:"DROP"})
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log(response);
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
      <Navbar></Navbar>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover'>
          <thead className=' text-white fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size.charAt(0).toUpperCase() + food.size.slice(1)}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0">
                    <Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                    </button> </td></tr>
            ))}
          </tbody>
        </table>
        <div className='mt-5'>
            <h1 className='fs-5'>Sub Total : ₹{totalPrice}</h1>
            <h1 className='fs-5'>CGST(2.5%) : ₹{totalPrice*0.025}</h1>
            <h1 className='fs-5'>SGST(2.5%) : ₹{totalPrice*0.025}</h1>
            <h1 className='fs-5'>Delivery Charges : ₹35</h1>
            <hr></hr>
            <h1 className='fs-2' id="GrossAmount">Gross Amount : ₹{totalPrice+totalPrice*0.05+35}</h1>
            </div>
        <div>
          <button className='btn bg-info mt-5 ' onClick={handleCheckOut} > Check Out </button>
          <button className='btn bg-info mt-5 mx-3 ' onClick={handleClearCart} > Clear Cart </button>
        </div>
       
      </div>

              <Footer></Footer>

    </div>
  )
}