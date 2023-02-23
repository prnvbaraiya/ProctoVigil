import { useLocation, Navigate, Outlet } from "react-router-dom";
import auth from "../auth/auth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();

  return auth.isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
