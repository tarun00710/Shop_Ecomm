import React from "react";
import { useCart } from "../Context/CartContext";

const WishList = () => {
  const { state, dispatch } = useCart();
  const { itemInWishlist } = state;
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
      {itemInWishlist.map(({ id, name, image, price, inStock }) => {
        return (
          <>
            <div id={id} class="horizontal-card card-dismiss">
              <div
                onClick={() =>
                  dispatch({ type: "REMOVEWISHLIST", payload: id })
                }
              >
                <i class="fas fa-times dismiss"></i>
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
                  <button type="button" class="btn btn-outline">
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
