import React from "react";
import "./TopBar.css";
import { Link } from "react-router-dom";

export const TopBar = () => {
  return (
    <div id="top">
      <h2>Store</h2>
      <Link to="/" id="navR" style={{ width: "160px", fontSize: "10px" }}>
        Go To Web Site
      </Link>
    </div>
  );
};
