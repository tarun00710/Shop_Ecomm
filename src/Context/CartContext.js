import React, { createContext, useContext, useReducer,useEffect } from "react";
import {SignInContext} from './SignInContext';
export const CartContext = createContext();

const reducerfunction = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      return {
        ...state,
        itemInCart: [...state.itemInCart, action.payload],
        totalCartValue: state.totalCartValue + parseInt(action.payload.price)
      };
    }
    case "ADD_TO_WISHLIST": {
      return {
        ...state,
        itemInWishlist: [...state.itemInWishlist, action.payload]
      };
    }
    case "REMOVE_CART": {
      return {
        ...state,
        itemInCart:[
          ...state.itemInCart.filter((item) => item.product._id !== action.payload._id)
        ],
        totalCartValue: state.totalCartValue - parseInt(action.payload.price)
      };
    }
    case "REMOVE_WISHLIST": {
      return {
        ...state,
        itemInWishlist: [
          ...state.itemInWishlist.filter((item) => item._id !== action.payload._id)
        ]
      };
    }
    case "MOVE_TO_CART":{
      console.log("Move to cart fired")
      return {...state,
      itemInWishlist:[...state.itemInWishlist.filter((item)=>item._id !== action.payload.product._id)],
      itemInCart:[...state.itemInCart,action.payload]
      }
    }
    case "MOVE_TO_WISHLIST":{
      console.log("Move to wishlist fired")
      return {
        ...state,
        itemInCart:[...state.itemInCart.filter((item)=>item.product._id!== action.payload._id)],
        itemInWishlist:[...state.itemInWishlist,action.payload]
      }
    }
    case "INCREASE_CART":{
      return{
        ...state,
        itemInCart:[...state.itemInCart.map((item)=>{
            if(item.product._id===action.payload._id)
              item.quantity=action.payload.quantity+1
              return item
        }
      )]
      }
    }
    case "DECREASE_CART":{ 
      if(action.payload.quantity===1)
        return {
          ...state,
          itemInCart:[
            ...state.itemInCart.filter((item) => item.product._id !== action.payload._id)
          ]
        }  
      return{
        ...state,
        itemInCart:[...state.itemInCart.map((item)=>{
          if(item.product._id===action.payload._id)
            item.quantity=action.payload.quantity-1
            return item
      }
    )]
      }
    }
    case "USER":{
      console.log("this action happened",action.payload.userData.wishlist)
      return {
        ...state,
      itemInWishlist:action.payload.userData.wishlist,
      itemInCart:action.payload.userData.cart
      }
    }
    default:
      return { state };
  }
};

export function ContextProvider({ children }) {
const {userData}=useContext(SignInContext);
  useEffect(()=>{
    console.log("dispatching",userData)
    dispatch({type:"USER",payload:{userData:userData}})
  },[userData])


//  const {cart,wishlist}=userData;
//  console.log(cart);
//  console.log(wishlist);
  const [state, dispatch] = useReducer(reducerfunction, {
    itemInCart: [],
    itemInWishlist:[],
    totalCartValue: 0
  });
  console.log(state)
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};
