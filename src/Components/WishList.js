import React,{useContext} from "react";
// import { useCart } from "../Context/CartContext";
import {CartContext} from "../Context/CartContext";
import {SignInContext} from '../Context/SignInContext'
import {predispatch} from './Predispatch';

const WishList = () => {
  // const { state, dispatch } = useCart();
  // const{ logIn, loggedIn, setLoggedIn,userData,setUserData }=useSignInContext()
  const { state, dispatch }=useContext(CartContext);
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
      {itemInWishlist?.map(({_id, name, image, price, inStock }) => {
        return (
          <>
            <div  class="horizontal-card card-dismiss">
              <div
                onClick={async() =>{
                  const check=await predispatch(_id,userData._id,"removeWishlist")
                  console.log(check)
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
                <i class="fa fa-trash"></i>
              </div>
              <img class="hcard-image" src={image} alt="img" />
              <div class="card-info">
                <div class="card-description">
                  <h2>{name}</h2> 
                  <p>Rs. {price}</p>
                  {inStock && <div> In Stock </div>}
                  {!inStock && <div> Out of Stock </div>}
                </div>
                <div class="card-button-option">
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
  );
};

export default WishList;
