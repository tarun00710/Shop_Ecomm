import React,{useContext} from 'react'
import { useParams } from 'react-router'
import {ProductCreateContext} from '../Context/ProductContext'

function ProductDetail() {
    const {data}=useContext(ProductCreateContext)
    const {productId}=useParams()
    const getProduct=data.find((item)=>item._id===productId)
    const {name,image,price,ratings,inStock,material,brand,offer,level,fastDelivery}=getProduct
    const rateStar=new Array(ratings).fill("⭐")
    
    return (
        <div className="product-card-detail">
            <h2>{name}</h2>
            <p>{rateStar.map((star)=><span>{star}</span>)}</p>
            <div className="responsive-img"><img src={image} alt={name} /></div>
            <p>Offer:{offer}</p>
            <div>
                <span><strong>Rs.{price}</strong></span>
                <p>{inStock?<label>Hurry! Items in Stock</label>:<label>Sorry,no items left</label>}</p>
            </div>
            <p><strong>ProductMaterial-</strong> {material}<span>{brand}</span></p>
            <div className="card-description">
                <p className="head_title">Product-Type:{level}</p>
                {fastDelivery?<span>Fast delivery Available</span>:<span>Regular Delivery</span>}
            </div>
        </div>
    )
}

export default ProductDetail
