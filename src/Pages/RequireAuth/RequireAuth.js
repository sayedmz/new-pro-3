import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Users } from "../context/context";

import { useContext } from "react";

export default function () {
  const user = useContext(Users);
  const location = useLocation();

  return user.auth.userDetails ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
