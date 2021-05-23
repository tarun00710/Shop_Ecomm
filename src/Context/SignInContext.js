import React, { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export const SignInContext = createContext();

export const SignInContextProv = ({ children }) => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const { state } = useLocation();
  console.log({ state });
  const logIn = async (e, email, password, setuserCheck) => {
    e.preventDefault();
    try {
      const res = await fetch("https://glacial-spire-70844.herokuapp.com/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.status === 422 || !data) {
        window.alert("Invalid Login");
      } else {
        console.log(data);
        setLoggedIn(true);
        setuserCheck({ email: "", password: "" });
        navigate(state?.from ? state.from : "/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SignInContext.Provider value={{ logIn, loggedIn, setLoggedIn }}>
      {children}
    </SignInContext.Provider>
  );
};
export const useSignInContext = () => {
  useContext(SignInContext);
};
