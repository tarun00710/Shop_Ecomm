import React, { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
export const SignInContext = createContext();

export const SignInContextProv = ({ children }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const { state } = useLocation();
  const [userData,setUserData] = useState({})

  console.log(userData)
  const logIn = async (e, email, password, setuserCheck) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://glacial-spire-70844.herokuapp.com/user/login",
      {email,password}
      )
      if(res.status){
        setUserData(res.data.user)
      }
      console.log("response",res)
      if (userData.status === 422 || !userData) {
        window.alert("Invalid Login");
      } else {
        setLoggedIn(true);
        setuserCheck({ email: "", password: "" });
        navigate(state?.from ? state.from : "/");
      }
    } catch (err) {
      res.json({success:false,error:err})
    }
  }
  return (
    <SignInContext.Provider value={{ logIn, loggedIn, setLoggedIn,userData,setUserData }}>
      {children}
    </SignInContext.Provider>
  );
};
export const useSignInContext = () => {
  useContext(SignInContext);
};
