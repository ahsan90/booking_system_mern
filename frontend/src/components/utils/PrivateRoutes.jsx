import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Outlet, useNavigate, Navigate } from "react-router-dom";

const PrivateRoutes = ({ allowedRoles }) => {
  const { loggedInUser } = useSelector((state) => ({ ...state.auth }));
  //console.log(allowedRoles?.includes(loggedInUser?.role))
  //const navigate = useNavigate();
  const location = useLocation();
  return allowedRoles?.includes(loggedInUser?.role) ? (
    <Outlet />
  ) : loggedInUser ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
