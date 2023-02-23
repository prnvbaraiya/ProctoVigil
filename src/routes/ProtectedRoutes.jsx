import { Route, Navigate } from "react-router-dom";
import auth from "../auth/auth";

export const ProtectedRoute = ({
  component: Component,
  allowedRoles,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.isAuthenticated) {
          return <Navigate to={{ pathname: "/login" }} />;
        }
        const userRole = auth.role;
        if (!allowedRoles.includes(userRole)) {
          return <Navigate to={{ pathname: "/unauthorized" }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};
