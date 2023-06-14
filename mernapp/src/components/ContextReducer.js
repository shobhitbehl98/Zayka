import React, { createContext, useContext, useReducer } from 'react'

const cartStateContext = createContext();
const cartDispatchContext = createContext();
const reducer = (state,action)=>{
    switch (action.type) {
        case "ADD":
            return [...state,{id:action.id,name:action.name,img:action.img,qty:action.qty,size:action.size,price:action.price}]
        case "REMOVE":
            let newArr = [...state]
            console.log(action.index,"newArr")
            newArr.splice(action.index, 1)
            console.log(newArr,"updated newArr")
            return newArr;
        case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    arr[index] = { ...food, qty: parseInt(action.qty) + parseInt(food.qty), price: action.price + food.price }
                }
                return arr
            })
        return arr

    
        default:
            console.log("error in reducer");
    }

}
export const CartProvider = (
 {children}
) =>{
    const [state,dispatch] = useReducer(reducer,[]);
    return(
        <cartDispatchContext.Provider value={dispatch}>
            <cartStateContext.Provider value={state}>
                {children}
            </cartStateContext.Provider>
        </cartDispatchContext.Provider>
    )
}

export const useCart = ()=>useContext(cartStateContext)
export const useDispatchCart = ()=>useContext(cartDispatchContext)