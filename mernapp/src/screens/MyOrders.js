import React, { useEffect,useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
let moment = require('moment')

export default function MyOrders() {
    const [orders,getorders] = useState([])
    let prev=0;
    let details = async() => {
        try {
            let email = localStorage.getItem('userEmail')
            if(!localStorage.getItem('getOrders')){
            let response = await fetch(`${process.env.REACT_APP_BACKEND}/api/getmyorders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({email:email})
            })
            let x = await response.json();
            localStorage.setItem('getOrders',JSON.stringify(x));
        }
            const res=JSON.parse(localStorage.getItem('getOrders'));
            await getorders(res.data);
        } catch (error) {
            console.log(error,"details")
            return[];
        }
    }

    useEffect(()=>{
        details()
    },[])

    return (
        <div>
            <div><Navbar></Navbar></div>
        <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
            <table className='table table-hover'>
                <thead className='text-white fs-4'>
                    <tr>
                        <td>#</td>
                        <td>Date</td>
                        <td>Order</td>
                        <td>Total Amount</td>
                    </tr>


                </thead>
                <tbody>
                    
                    {
                        orders?.map((item,index)=>(
                            item.details?.map((d,i)=>(
                                <tr>
                            {i==0?<td className='fw-bold fs-5'>{index+1})</td>:i!=d.length?<td></td>:<td></td>}
                            {i==0?<td>{moment(item.date).format('DD-MM-YYYY HH:mm:ss')}</td>:<td></td>}
                            <td>
                                Name: {d.name}
                                <br></br>
                                Quantity: {d.qty}
                                <br></br>
                                Size: {d.size.charAt(0).toUpperCase() + d.size.slice(1)}
                                <br></br>
                                Price: ₹{d.price}
                            </td>
                            {i==0?<td>₹{item.totalPrice!=null?item.totalPrice:0}</td>:<td></td>}
                            </tr>
                        )
                        )))}
                </tbody>
            </table>
        </div>
        <div><Footer></Footer></div>
    </div>
    )
}
