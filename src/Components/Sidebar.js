import React from 'react';
import { NavLink } from "react-router-dom";
const Sidebar = ({ sidebar, handleSidebar }) => {
  const linkStyle = { color: "white", textDecoration: "none" };
  return (
    <>
      <nav
        onClick={handleSidebar}
        className={sidebar ? "sidebaractive" : "sidebar"}
      >
        <i className="fa fa-times" aria-hidden="true"></i>
        <ul className="nav-list sidebarMenu">
          <li className="nav-menu-items">
            <NavLink to="/signup" style={linkStyle}>
              SignUp/LogIn<i class="fa fa-user" aria-hidden="true"></i>
            </NavLink>
            <hr />
          </li>

          <li className="nav-menu-items">
            <NavLink to="/wishlist" style={linkStyle}>
              Wishlist<i className="fa fa-heart" aria-hidden="true"></i>
            </NavLink>
            <hr />
          </li>

          <li className="nav-menu-items">
            <NavLink to="/checkout" style={linkStyle}>
              Cart<i className="fa fa-shopping-cart" aria-hidden="true"></i>
            </NavLink>
            <hr />
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Sidebar;
