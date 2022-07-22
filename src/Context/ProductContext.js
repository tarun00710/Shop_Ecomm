import axios from 'axios';
import React,{createContext,useState,useEffect,useContext} from 'react'
import {useCart } from './CartContext';
export const ProductCreateContext=createContext();

const ProductContext=({children})=> {
    const {setisLoading}=useCart()
    const [data,setData]=useState([])
    useEffect(() => {
            const getdatalist = async() => {
                const response=await axios.get("https://glacial-spire-70844.herokuapp.com/products")
                setData(response.data.products)
                setisLoading(false)
            }
        getdatalist()
    }, [])
    return (
        <ProductCreateContext.Provider value={{data}}>
            {children}
        </ProductCreateContext.Provider>
    )
}

export const ProductCollection=()=>{
    useContext(ProductCreateContext)
}

export default ProductContext
