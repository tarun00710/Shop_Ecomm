import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import {CartContext} from "../Context/CartContext";
import {SignInContext} from '../Context/SignInContext'
import {predispatch} from './Predispatch';
import { useCart } from "../Context/CartContext";


const Checkout = () => {
  const { state, dispatch } = useCart();
  const { itemInCart, totalCartValue } = state;
  const {userData}=useContext(SignInContext)

//   const [items,setItems]=useState([])
//   useEffect(() => {
//     axios.get('http://localhost:3000/user/609ba47c6b47f313fca60b47/wishlist')
//         .then(response => setItems(response.data.wishlist));
// }, []);


console.log(itemInCart);
  return (
    <div>
      <h2>Items in Cart:</h2>
      <div class="grid-2">
        <div>
          {itemInCart?.map((item) => {
            const {product,quantity}=item;
            const { _id, name, image, price, inStock }=product
            
            return (
              <>
                <div id={_id} class="horizontal-card card-dismiss">
                  <i

                    onClick={async() =>{
                      const check=await predispatch(_id,userData._id,"removeCart")
                      check.success ?  dispatch({ 
                      type: "REMOVE_CART", 
                      payload: {
                        _id,
                         name,
                         image,
                         price,
                        inStock 
                      }}
                      ) : {}
                       
                    }
                    }
                    class="fa fa-trash" aria-hidden="true"
                  ></i>
                  <img class="hcard-image" src={image} alt="img"></img>
                  <div class="card-info">
                    <div class="card-description">
                      <h4>{name}</h4>
                      <p>Rs. {price}</p>
                      {inStock && <p> In Stock </p>}
                      {!inStock && <p> Out of Stock </p>}
                      <div>
                        <i class="fa fa-minus-square" aria-hidden="true" 
                        onClick={async()=>{
                          const check=await predispatch(_id,userData._id,"decreaseQuantity",quantity)
                          check.success ? dispatch({type:"DECREASE_CART",payload:{_id,quantity}}) : {}
                          
                        }
                        }>
                        
                        </i> 
                        {quantity}
                        <i class="fa fa-plus-square" aria-hidden="true" 
                        onClick={
                          async()=>{
                            const check=await predispatch(_id,userData._id,"increaseQuantity",quantity)
                            check.success ? dispatch({type:"INCREASE_CART",payload:{_id,quantity}}) : {}
                          }
                        }>
                        </i>
                      </div>
                     
                    </div>
                    <div class="card-button-option">
                      <button type="button" class="btn btn-outline"
                      onClick={async() =>{
                        const check= await predispatch(_id,userData._id,"moveToWishlist")
                      check.success ?  dispatch({ type: "MOVE_TO_WISHLIST",  payload: {
                        _id,
                         name,
                         image,
                         price,
                        inStock 
                      }}) : {}
                      }
                      }
                      >
                      
                        Move to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div class="flex-in-grid">
          <p>Total Cart Value:</p>
          <h4>Rs.{totalCartValue}</h4>
          <button type="button" class="btn btn-primary">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
