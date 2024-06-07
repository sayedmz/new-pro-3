import React, { useContext } from "react";
import "./TopBar.css";
import { NavLink } from "react-router-dom";
import { Color } from "../../Pages/context/context";

export const SideBar = () => {
  //1ere
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
      </div>
    </>
  );
};
