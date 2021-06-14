import React, { createContext, useContext, useReducer,useEffect, useState } from "react";
import {SignInContext} from './SignInContext';
export const CartContext = createContext();

const reducerfunction = (state, action) => {
  const {payload,type}=action
  switch (type) {
    case "ADD_TO_CART": {
      return {
        ...state,
        itemInCart: [...state.itemInCart, payload],
        totalCartValue: state.totalCartValue + payload.product.price
      };
    }
    case "ADD_TO_WISHLIST": {
      return {
        ...state,
        itemInWishlist: [...state.itemInWishlist, payload]
      };
    }
    case "REMOVE_CART": {
      return {
        ...state,
        itemInCart:[
          ...state.itemInCart.filter((item) => item.product._id !== payload._id)
        ],
        totalCartValue: state.totalCartValue-payload.price*payload.quantity
      };
    }
    case "REMOVE_WISHLIST": {
      return {
        ...state,
        itemInWishlist: [
          ...state.itemInWishlist.filter((item) => item._id !== payload._id)
        ]
      };
    }
    case "MOVE_TO_CART":{
      console.log("Move to cart fired")
      return {...state,
      itemInWishlist:[...state.itemInWishlist.filter((item)=>item._id !== payload.product._id)],
      itemInCart:[...state.itemInCart,payload],
      totalCartValue: state.totalCartValue+payload.product.price
      }
    }
    case "MOVE_TO_WISHLIST":{
      console.log("Move to wishlist fired")
      return {
        ...state,
        itemInCart:[...state.itemInCart.filter((item)=>item.product._id!== payload._id)],
        itemInWishlist:[...state.itemInWishlist,payload],
        totalCartValue: state.totalCartValue-payload.price*payload.quantity
      }
    }
    case "INCREASE_CART":{
      return{
        ...state,
        itemInCart:[...state.itemInCart.map((item)=>{
            if(item.product._id===payload._id)
              item.quantity=payload.quantity+1
              return item
        }
      )],
      totalCartValue:state.totalCartValue+payload.price
      }
    }
    case "DECREASE_CART":{ 
      if(payload.quantity===1)
        return {
          ...state,
          itemInCart:[
            ...state.itemInCart.filter((item) => item.product._id !== payload._id)
          ],
          totalCartValue:state.totalCartValue-payload.price
        }  
      return{
        ...state,
        itemInCart:[...state.itemInCart.map((item)=>{
          if(item.product._id===payload._id)
            item.quantity=payload.quantity-1
            return item
      }
    )],
    totalCartValue:state.totalCartValue-payload.price
      }
    }
    case "USER":{
      console.log("this action happened",payload.userData.wishlist)
      const cartValue=payload.userData.cart?.reduce((acc,item)=>{
        return acc=acc+item.product.price*item.quantity
      },0)
      console.log(cartValue)
      return {
        ...state,
      itemInWishlist:payload.userData.wishlist,
      itemInCart:payload.userData.cart,
      totalCartValue:cartValue
      }
    }
    default:
      return { state };
  }
};

export function ContextProvider({ children }) {

const [isLoading,setisLoading] =useState(true) 
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
    <CartContext.Provider value={{ state, dispatch,isLoading,setisLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};
