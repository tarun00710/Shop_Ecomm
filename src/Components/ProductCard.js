import React, { useContext } from "react";
import { useCart } from "../Context/CartContext";
import {SignInContext} from "../Context/SignInContext";
import {predispatch} from './Predispatch';
const ProductCard = ({
  id,
  name,
  image,
  price,
  productName,
  inStock,
  level
}) => {
  const { dispatch,isLoading,setisLoading } = useCart();
  const {userData}=useContext(SignInContext)
  return (
    <>
      <div key={id} className="shadow">
        <img className="card-image" src={image} alt={productName} />
        <div className="card-inform">
          <div className="card-description">
            <p className="head_title"> {name} </p>
            <p>Rs. {price}</p>
            {inStock && <p> In Stock </p>}
            {!inStock && <p> Out of Stock </p>}
            <p>{level}</p>
           
            <div className="card-button-option">
              <button
                onClick={() =>{
                  const check=predispatch(id,userData._id,"cart")
                  return check.success ? dispatch({
                    type: "ADD_TO_CART",
                    payload: {
                      product:{ 
                        id,
                        name,
                        image,
                        price,
                        productName,
                        inStock,
                        level,
                        fastDelivery
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
                onClick={() => {
                  const check=predispatch(id,userData._id,"wishlist")
                  if(check)
                    return dispatch({
                      type: "ADD_TO_WISHLIST",
                      payload: {
                        id,
                        name,
                        image,
                        price,
                        productName,
                        inStock,
                        level,
                        fastDelivery
                      }
                    })
                  return null  
                }}
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
