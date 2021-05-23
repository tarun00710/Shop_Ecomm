import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { SignInContext } from "../Context/SignInContext";
const PrivateRoute = ({ path, ...props }) => {
  const { loggedIn } = useContext(SignInContext);
  return loggedIn ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/signin" />
  );
};
export default PrivateRoute;
