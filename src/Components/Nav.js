import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ handleSidebar }) => {
  const linkStyle = { color: "white", textDecoration: "none" };
  const activeStyle = { color: "#58ABFF" };

  return (
    <div className="Nav-section">
      <div className="nav">
        <NavLink style={linkStyle} to="/" activeStyle={activeStyle}>
          <label>ShopLook</label>
        </NavLink>
        <div class="search-btn">
          <input class="nav-input" placeholder="Search" type="text" />
          <i class="fa fa-search" aria-hidden="true"></i>
        </div>
        <ul className="nav-list">
          <li>
            <NavLink to="/signup" style={linkStyle} activeStyle={activeStyle}>
              SignUp/LogIn <i class="fa fa-user" aria-hidden="true"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/wishlist" style={linkStyle} activeStyle={activeStyle}>
              Wishlist <i className="fa fa-heart" aria-hidden="true"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/checkout" style={linkStyle} activeStyle={activeStyle}>
              Cart <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </NavLink>
          </li>
        </ul>
        <div onClick={handleSidebar} className="hamburger">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};
export default Nav;
