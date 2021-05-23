import React, { useState } from "react";
import "./styles.css";
import Product from "./Components/Product";
import Checkout from "./Components/Checkout";
import { Route, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import WishList from "./Components/WishList";
import SignUser from "./Components/SignUp";
import LogInUser from "./Components/SignIn";
import PrivateRoute from "./Auth/PrivateRoute";
import Sidebar from "./Components/Sidebar";

export default function App() {
  const [sidebar, togglesidebar] = useState(false);

  const handleSidebar = () => togglesidebar((sidebar) => !sidebar);
  return (
    <div className="App">
      <Nav handleSidebar={handleSidebar} />
      <Sidebar sidebar={sidebar} handleSidebar={handleSidebar} />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/signup" element={<SignUser />} />
        <Route path="/signin" element={<LogInUser />} />
        <PrivateRoute path="/checkout" element={<Checkout />} />
        <PrivateRoute path="/wishlist" element={<WishList />} />
      </Routes>
    </div>
  );
}
