import React, { useEffect, useState } from "react";
import SortFilter from "./SortFilter";
import ProductCard from "./ProductCard";
import { useSortFilter } from "../Context/SortFilerContext";

const Product = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const getdatalist = async () => {
      const res = await fetch("https://glacial-spire-70844.herokuapp.com/products", {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      });
      const datalist = await res.json();
      setdata(datalist.products);
    };
    getdatalist();
  }, []);

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
  console.log(getSortData); 
  const filterData=getFilteredData(getSortData,state.stock)
  console.log(filterData);
  const fastDelivery=getFast(filterData, state.delivery);
  console.log(fastDelivery);
  return (
    <>
      <SortFilter />
      <div className="grid-vertical-card">
        {fastDelivery.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            inStock,
            level,
            fastDelivery
          }) => (
            <ProductCard
              id={id}
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
    </>
  );
};
export default Product;
