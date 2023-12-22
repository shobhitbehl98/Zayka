import React, { useState, useEffect } from 'react'
import Delete from '@mui/icons-material/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Alert from '../components/Alert'

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  let navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [config, setConfig] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true)
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate('/');

  };
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, [])
 

  if (data.length === 0) {
    return (
      <div>
        <Link className='btn btn-close fs-3' style={{ marginLeft: "90%", marginTop: "2rem" }} to="/" ></Link>
        <div className=' w-100 text-center fs-3'>The Cart is Empty!</div>
        <div>
            {showAlert && (
        <Alert
          message="Order Placed Succesfully"
          onClose={handleCloseAlert}
        />
      )}
        </div>
      </div>
    )
  }
  const handleClearCart = () => {
    dispatch({ type: "DROP" })
  }
  const handlePayment = async () => {

    try {
      let userEmail = localStorage.getItem("userEmail");
      let res = await fetch(`${process.env.REACT_APP_BACKEND}/api/Payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          total_price: totalPrice
        })
      });
      res=await res.json();
      const options = {
        key: 'rzp_test_qmlqkzH0IhOcvY',
        amount: totalPrice * 100,
        currency: 'INR',
        order_id: data.id,
        handler: function (response) {
          // Handle the payment success response
          // Make a request to your server to update the payment status
          fetch(`${process.env.REACT_APP_BACKEND}/api/payment-response`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              response: response,
              order_data: data,
              email: userEmail,
              order_date: new Date().getTime(),
              total_price: totalPrice
            }),
          })
          .then((backendResponse) => {
            if(backendResponse.status==200){
              handleShowAlert();
              dispatch({ type: "DROP" });
              
            }
            backendResponse.json()
            })
            .catch((error) => {
              console.error('Error updating payment status:', error);
            });
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    } catch (e) {
      console.log(e);
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>
      <Navbar></Navbar>
      
      <div className='container m-auto mt-1 pt-5 table-responsive  table-responsive-sm table-responsive-md' >
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
            {data?.map((food, index) => (
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
          <h1 className='fs-5'>CGST(2.5%) : ₹{totalPrice * 0.025}</h1>
          <h1 className='fs-5'>SGST(2.5%) : ₹{totalPrice * 0.025}</h1>
          <h1 className='fs-5'>Delivery Charges : ₹35</h1>
          <hr></hr>
          {/* {totalPrice += (totalPrice * 0.05 + 35)} */}
          <h1 className='fs-2' id="GrossAmount">Gross Amount : ₹ {totalPrice += (totalPrice * 0.05 + 35)}</h1>
        </div>
        <div>
          <button className='btn bg-info mt-5 ' onClick={handlePayment} > Check Out </button>
          <button className='btn bg-info mt-5 mx-3 ' onClick={handleClearCart} > Clear Cart </button>
        </div>

      </div>

      <Footer></Footer>

    </div>
  )
}