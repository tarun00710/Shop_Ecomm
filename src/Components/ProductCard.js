import React from "react";
import { useCart } from "../Context/CartContext";

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
                onClick={() =>
                  dispatch({
                    type: "ADDTOCART",
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
                }
                className="btn btn-primary"
              >
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
              <button
                onClick={() =>
                  dispatch({
                    type: "ADDTOWISHLIST",
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
                }
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
