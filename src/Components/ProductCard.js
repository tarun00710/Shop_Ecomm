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
  level,
  fastDelivery
}) => {
  const { dispatch } = useCart();
  const {userData}=useContext(SignInContext)
  return (
    <>
      <div key={id} className="shadow">
        <img className="card-image" src={image} alt={productName} />
        <div className="card-inform">
          <div className="card-description">
            <h3> {name} </h3>
            <div>Rs. {price}</div>
            {inStock && <div> In Stock </div>}
            {!inStock && <div> Out of Stock </div>}
            <div>{level}</div>
            {fastDelivery ? (
              <div> Fast Delivery </div>
            ) : (
              <div> 3 days minimum </div>
            )}
            <div className="card-button-option">
              <button
                onClick={() =>{
                  const check=predispatch(id,userData._id,"cart")
                  return check ? dispatch({
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
                      quantity:0   
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
