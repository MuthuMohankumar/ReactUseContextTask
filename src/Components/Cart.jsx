import React, { useContext, useState } from 'react';
import { mycontext } from '../App';
import './Cart.css'
const Cart = () => {
    const[data,setdata]=useContext(mycontext);
    const totalPrice = data.reduce((total,data)=>total+data.price*(data.quantity || 1),0);
    const totalQuantity = data.reduce((total,data)=>total+(data.quantity || 1),0);
   


    const addQuantity=(id,quantity)=>{
        setdata(curr=>{

            return curr.map((element)=>{
                if(element.id==id)
                    {
                        return {...element,quantity:(element.quantity+1 || quantity+1)}
                        
                    }
                return element
    
            })

        })
        
        

    }
    const decQuantity=(id,quantity)=>{
        setdata(curr=>{
            return curr.map((element)=>{
                if(element.id==id && quantity>0 ){
                    return {...element, quantity:(element.quantity-1 || quantity-1)}
                }
                return element
            })
        })
 
    }
    
    const removed=(id)=>{

        return data.filter((element)=>{element.id === id})

    }
    return (
        
        <>
        
        <div className="top">
        <h1>CART</h1>
        <h3>Total Quantiy :{totalQuantity}</h3>
        <h3>TotalPrice :{totalPrice}</h3>
        <hr />
        </div>
       {data.map((element,index)=>{
        return(
            <div key={index}>
                <div className='card'>
                <h2>Brand : {element.brand}</h2>
                <h1>{element.title}</h1>
                <p><strong>{element.description}</strong></p>
                {element.images.map((ele,i)=>{
                    return(
                        <div key={i}>
                            <img src={ele}></img>
                        </div>
                    )
                })}
                
                <h2>Price:{element.price*element.quantity ||element.price}</h2>
                
                <button onClick={()=>decQuantity(element.id, element.quantity || 1 )}>-</button>
                <button >{element.quantity ||1}</button>
                <button onClick={()=>addQuantity(element.id, element.quantity || 1)}>+</button>
                <br />
                <br />
                <button onClick={()=>removed(element.id)}>Removed</button> 
                </div>
                
                
            </div>
        )
       })}
        
        
        </>
    );
};

export default Cart;