import React, { useState } from 'react'
import { useCart,useDispatchCart } from './ContextReducer';
import Alert from './Alert';


export default function Card(props) {
    const [qty,setQty] = useState(1)
    const [cat,setCat] = useState(0)
    const [showAlert, setShowAlert] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true)
  };

  const handleCloseAlert = () => {
    setShowAlert(false);

  };
    let options=props.options;
    let optionkey=Object.keys(options)
    let optionvalue=Object.values(options)
    let dispatch = useDispatchCart();
    let data = useCart()
    const handleAddToCart = async()=>{
        let food = [];
        if(!localStorage.getItem('authToken')){
            handleShowAlert()
            return;
        }
        for(let item of data){
            if(item.id===props.foodItem._id){
                food=item;
                break;
            }
        }
        if(food!==[]){
            if(food.size===optionkey[cat]){
            await dispatch({type:"UPDATE",id:props.foodItem._id,qty:qty,price:qty*optionvalue[cat],size:optionkey[cat]});
            return
            }
        }
        await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,img:props.foodItem.img,price:qty*optionvalue[cat],qty:qty,size:optionkey[cat]})
    }
    return (
        <div>
            <div>
            <div>
            {showAlert && (
        <Alert
          message="Please Login/Signup"
          onClose={handleCloseAlert}
        />
      )}
        </div>
                <div className="card mt-3" style={{ "width": "360px", "height": "520px","borderRadius":'1.5rem' }}>
                    <img className="card-img-top"  src={props.foodItem.img} height={"240px"} width={"180px"} style={{objectFit:'fill',borderRadius:'1rem'}} alt="Card image cap" ></img>
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <h6>{props.foodItem.Veg===true?"Veg":"Non-Veg"}</h6>
                        <p className="card-text">{props.foodItem.description}</p>
                        <div className='mt-auto me-auto'>
                            <select className='h-50 bg-danger mx-0' onChange={(e) => setQty(e.target.value)}>
                                {
                                    Array.from(Array(10), (f, i) => {
                                        return (
                                            <option value={i+1}>{i + 1}</option>
                                        )
                                    })
                                }
                            </select>
                            <select className='m-3 h-50 bg-danger' onChange={(e) => setCat(e.target.value)}>
                                {optionkey.map((str)=>{return str.charAt(0).toUpperCase() + str.slice(1)}).map((item,i)=>{   
                                    return <option key={item} value={i}>{item}</option>
                                })}
                            </select>
                            <div className='d-inline fs-5 mx-0'>
                            ₹{qty*optionvalue[cat]}
                               </div>

                               <button className='btn bg-info mx-2 h-10 mb-1' onClick={handleAddToCart}>Add to Cart
                               </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
