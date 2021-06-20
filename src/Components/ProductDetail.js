import React,{useContext} from 'react'
import { useParams } from 'react-router'
import {predispatch} from './Predispatch';
import { useCart } from "../Context/CartContext";
import {SignInContext} from "../Context/SignInContext";
import {ProductCreateContext} from '../Context/ProductContext'

function ProductDetail() {
    const {data}=useContext(ProductCreateContext)
    const { dispatch} = useCart()
    const {userData}=useContext(SignInContext)
    const {productId}=useParams()
    const getProduct=data.find((item)=>item._id===productId)
    const {_id,name,image,price,ratings,inStock,material,brand,offer,level,fastDelivery}=getProduct
    const rateStar=new Array(ratings).fill("⭐")
    
    return (
        <div className="product-card-detail">
            <h2>{name}</h2>
            <p><label>Ratings : </label>{rateStar.map((star)=><span>{star}</span>)}</p>
            <img className="responsive-img spacing" src={image} alt={name} />
            
            <div  className="head_title spacing">
                <p>Offer:{offer}</p>
                <span><strong>Rs. {price}</strong></span>
                <p>{inStock?<label>Hurry! Items in Stock</label>:<label>Sorry,no items left</label>}</p>
                <p  className="head_title">Product-Material - {material}<span>{brand}</span></p>            
                <p>Product-Type : {level}</p>
                {fastDelivery?<span>Fast delivery Available</span>:<span>Regular Delivery</span>}
            </div>

            <div className="card-button-option">
            <button
              onClick={async() =>{
                const check=await predispatch(_id,userData._id,"cart")
                return check.success ? dispatch({
                  type: "ADD_TO_CART",
                  payload: {
                    product:{ 
                      _id,
                      name,
                      image,
                      price,
                     
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
                const check=await predispatch(_id,userData._id,"wishlist")
                if(check)
                  return dispatch({
                    type: "ADD_TO_WISHLIST",
                    payload: {
                      _id,
                      name,
                      image,
                      price,
                      inStock,
                      level
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
    )
}

export default ProductDetail
