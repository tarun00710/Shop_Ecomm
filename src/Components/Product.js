import React, { useContext, useEffect, useState } from "react";
import SortFilter from "./SortFilter";
import ProductCard from "./ProductCard";
import { useSortFilter } from "../Context/SortFilerContext";
import { CartContext } from "../Context/CartContext";
import Loading from "./Loader";
import {ProductCreateContext} from "../Context/ProductContext";

const Product = () => {

  const {isLoading,setisLoading}=useContext(CartContext)
  const {data}=useContext(ProductCreateContext)

  const { state } = useSortFilter();
  const sortFunction = (data, sortBy) => {
    switch (sortBy) {
      case "HightoLow":
        return data.sort(function (a, b) {
          return b["price"] - a["price"];
        });
      case "LowtoHigh":
        return data.sort(function (a, b) {
          return a["price"] - b["price"];
        });
      default:
        return data;
    }
  };

 
const getFilteredData=(getSortData,sortBy) =>{
  switch(sortBy){
    case "Instock":
      return getSortData.filter((item)=>{
        const {inStock}=item;
        return inStock==="true";
      })
    case "Outofstock":
      return getSortData.filter((item)=>{
        const {inStock}=item;
        return inStock==="false";
      })    
    default:
      return getSortData;    
  }
}
const getFast=(filterData,sortBy) =>{
    if(sortBy==="fastdelivery")
      return filterData.filter(({fastDelivery})=>{
        return fastDelivery==="true";
      })
    else  return filterData;
}

  const getSortData = sortFunction(data, state.sortBy);
  const filterData=getFilteredData(getSortData,state.stock)
  const fastDelivery=getFast(filterData, state.delivery);

  return (
    <>
      <SortFilter />
      
      { isLoading ? <Loading/> :
        <div className="grid-vertical-card">
        {fastDelivery.map(
          ({
            _id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery
          }) => (
            <ProductCard
              _id={_id}
              image={image}
              name={name}
              price={price}
              productName={productName}
              inStock={inStock}
              level={level}
              fastDelivery={fastDelivery}
            />
          )
        )}
        </div>
    }
    </>
  );
};
export default Product;
