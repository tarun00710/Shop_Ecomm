import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const reducerfunction = (state, action) => {
  switch (action.type) {
    case "ADDTOCART": {
      return {
        ...state,
        itemInCart: [...state.itemInCart, action.payload],
        totalCartValue: state.totalCartValue + parseInt(action.payload.price)
      };
    }
    case "ADDTOWISHLIST": {
      return {
        ...state,
        itemInWishlist: [...state.itemInWishlist, action.payload]
      };
    }
    case "REMOVECART": {
      return {
        ...state,
        itemInCart: [
          ...state.itemInCart.filter((item) => item.id !== action.payload.id)
        ],
        totalCartValue: state.totalCartValue - parseInt(action.payload.price)
      };
    }
    case "REMOVEWISHLIST": {
      return {
        ...state,
        itemInWishlist: [
          ...state.itemInWishlist.filter((item) => item.id !== action.payload)
        ]
      };
    }

    default:
      return { state };
  }
};

export function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducerfunction, {
    itemInCart: [],
    itemInWishlist: [],
    totalCartValue: 0
  });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};
