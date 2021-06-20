import { toast } from 'react-toastify';
export const notifyCart = () => toast.success("Added to Cart!");
export const notifyLogin = () => toast("Please Login first !");
export const notifyWishlist=() => toast.success("Added to Wishlist !")