import React from "react";
import { useCart } from "../Context/CartContext";
const Checkout = () => {
  const { state, dispatch } = useCart();
  const { itemInCart, totalCartValue } = state;
  return (
    <div>
      <h1>Items in Cart:</h1>
      <div class="grid-2">
        <div>
          {itemInCart.map(({ id, name, image, price, inStock }) => {
            return (
              <>
                <div id={id} class="horizontal-card card-dismiss">
                  <i
                    onClick={() =>
                      dispatch({ type: "REMOVECART", payload: { id, price } })
                    }
                    class="fas fa-times dismiss"
                  ></i>
                  <img class="hcard-image" src={image} alt="img"></img>
                  <div class="card-info">
                    <div class="card-description">
                      <h3>{name}</h3>
                      <p>Rs. {price}</p>
                      {inStock && <div> In Stock </div>}
                      {!inStock && <div> Out of Stock </div>}
                    </div>
                    <div class="card-button-option">
                      <button type="button" class="btn btn-outline">
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
