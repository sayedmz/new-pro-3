import React from "react";
import { TopBar } from "../../components/Dash/TopBar";
import { SideBar } from "../../components/Dash/SideBar";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div>
      <TopBar />
      <div id="container">
        <SideBar />
        <div style={{ width: "80%" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
