import React from "react";
import PropTypes from "prop-types";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import auth from "./auth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();

  return allowedRoles?.includes(auth.roles) ? (
    <Outlet />
  ) : auth.isAuthenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
RequireAuth.propTypes = {
  allowedRoles: PropTypes.array.isRequired,
};

export default RequireAuth;
