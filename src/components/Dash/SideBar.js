import React from "react";
import "./TopBar.css";
import { NavLink } from "react-router-dom";

export const SideBar = () => {
  //1ere
  //import { Color } from "../../Pages/context/context";
  // const valueColor = useContext(Color);
  // console.log(valueColor);
  return (
    <>
      <div id="sideBar">
        <NavLink className="sideLink" to="/dashboard/users">
          <i className="fa-solid fa-users"></i> Users
        </NavLink>
        <NavLink className="sideLink" to="/dashboard/user/create">
          <i className="fa-solid fa-user-plus"></i> New User
        </NavLink>

        <NavLink className="sideLink" to="/dashboard/products/">
          <i className="fa-brands fa-solid fa-product-hunt"></i> Products
        </NavLink>

        <NavLink className="sideLink" to="/dashboard/product/create">
          <i className="fa-solid fa-file-circle-plus"></i> New Product
        </NavLink>
      </div>
    </>
  );
};
