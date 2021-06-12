import axios from 'axios';
export const predispatch = async(id,userid,type,quantity) =>{
console.log("user",id,userid,type);
var res;
if(type==="cart"){
     res = await axios.post(`https://glacial-spire-70844.herokuapp.com/user/${userid}/cart/${id}`)
}
else if(type==="wishlist"){
    res = await axios.post(`https://glacial-spire-70844.herokuapp.com/user/${userid}/wishlist/${id}`)
}
else if(type==="removeWishlist")
    res=await axios.delete(`https://glacial-spire-70844.herokuapp.com/user/${userid}/wishlist/${id}`)
else if(type==="removeCart")
    res=await axios.delete(`https://glacial-spire-70844.herokuapp.com/user/${userid}/cart/${id}`)
else if(type==="moveToCart")
    res=await axios.post(`https://glacial-spire-70844.herokuapp.com/user/${userid}/updatewishlist/${id}`)
else if(type==="moveToWishlist")
    res=await axios.post(`https://glacial-spire-70844.herokuapp.com/user/${userid}/updatecart/${id}`)
else if(type==="increaseQuantity" || type==="decreaseQuantity" )
{
    if(quantity===1 && type==="decreaseQuantity"){
        res=await axios.delete(`https://glacial-spire-70844.herokuapp.com/user/${userid}/cart/${id}`)
    }
    else
        res=await axios.post(`https://glacial-spire-70844.herokuapp.com/user/${userid}/cart/${id}/update/${type}`)
                             
}
console.log(res);  
return res.data
}


