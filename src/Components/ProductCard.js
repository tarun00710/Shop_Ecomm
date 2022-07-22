import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import {SignInContext} from "../Context/SignInContext";
import {predispatch} from './Predispatch';
import {notifyCart,notifyLogin,notifyWishlist} from "./toast";


const ProductCard = ({
  _id,
  name,
  image,
  price,
  productName,
  inStock,
  level
}) => {

  const { dispatch} = useCart();
  const {userData, loggedIn}=useContext(SignInContext)

  return (
    <>
   
      <div key={_id} className="shadow">
      <NavLink className="navlink" to={`/product/${_id}`}>
        <img className="card-image" src={image} alt={productName} />
        </NavLink>   
        <div className="card-inform">
          <div className="card-description">
          <NavLink className="navlink" to={`/product/:${_id}`}>
          <p className="head_title"> {name} </p>
          </NavLink>
           
                  
            <p>Rs. {price}</p>
            {inStock && <p> In Stock </p>}
            {!inStock && <p> Out of Stock </p>}
            <p>{level}</p>
           
            <div className="card-button-option">
              <button
                onClick={async() =>{
                  const check=await predispatch(_id,userData._id,"cart")
                  loggedIn ? notifyCart() : notifyLogin()
                  return check.success ? dispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      product:{ 
                        _id,
                        name,
                        image,
                        price,
                        productName,
                        inStock,
                        level
                      },
                      quantity:1
                    }
                  }) : {}
                }
                  
                }
                className="btn btn-primary"
              >
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
              <button
                onClick={async() => {

                  loggedIn ? notifyWishlist() : notifyLogin()
                  const check=await predispatch(_id,userData._id,"wishlist")
                  {check ?
                     dispatch({
                      type: "ADD_TO_WISHLIST",
                      payload: {
                        _id,
                        name,
                        image,
                        price,
                        productName,
                        inStock,
                        level
                      }
                    })
                  : null  
                }}}
                type="button"
                className="btn btn-outline"
              >
                Move to Wishlist
              </button>
            </div>

          </div>
        </div>
      </div>
    
    </>
  );
};
export default ProductCard;
