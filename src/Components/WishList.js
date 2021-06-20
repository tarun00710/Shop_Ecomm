import React,{useContext} from "react";
// import { useCart } from "../Context/CartContext";
import {CartContext} from "../Context/CartContext";
import {SignInContext} from '../Context/SignInContext'
import Loading from "./Loader";
import {predispatch} from './Predispatch';
import { toast } from 'react-toastify';

const WishList = () => {
  
  const { state, dispatch,isLoading,setisLoading }=useContext(CartContext);
  const {userData}=useContext(SignInContext)
  const { itemInWishlist } = state;
  console.log(itemInWishlist)
  const style = {
    color: "#61AFEF",
    fontSize: "1.2rem",
    margin: "0.5rem 0 -1rem 1rem",
    textAlign: "center"
  };
  return (
    <div>
      <p style={style}>Your Favourite Items:</p>
      <hr />
      {isLoading?<Loading/>:
      
        <div>
        {itemInWishlist?.map(({_id, name, image, price, inStock }) => {
          return (
            <>
              <div  className="horizontal-card card-dismiss">
                <div
                  onClick={async() =>{
                    const check=await predispatch(_id,userData._id,"removeWishlist")
                    
                    check.success ?  dispatch({ type: "REMOVE_WISHLIST",payload: {
                      _id,
                       name,
                       image,
                       price,
                      inStock 
                    }}) : {}
                     
                  }
                }
                >
                  <i className="fa fa-trash"></i>
                </div>
                <img className="hcard-image" src={image} alt="img" />
                <div className="card-info">
                  <div className="card-description">
                  <p className="head_title"> {name} </p>
                    <p>Rs. {price}</p>
                    {inStock && <p> In Stock </p>}
                    {!inStock && <p> Out of Stock </p>}
                  </div>
                  <div className="card-button-option">
                    <button type="button" class="btn btn-outline" 
                    onClick={async()=>{
                      const check=await predispatch(_id,userData._id,"moveToCart")
                      console.log(check)
                      check.success ? dispatch({
                        type:"MOVE_TO_CART",
                        payload:{
                          product:{
                            _id,
                             name,
                             image,
                             price,
                            inStock 
                          },
                          quantity:1
                        }
                    }) : {}
                    }}>
                      Move to Cart
                    </button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
        </div>
      }  
    </div>
  );
};

export default WishList;
