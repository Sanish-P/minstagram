import * as React from "react";
import { Navigate, Outlet, RouteProps } from "react-router";
import { checkAuthentication, handleLogout } from "src/utils/auth";

const RedirectToLogout: React.FC = () => {
  handleLogout();
  return <Navigate to="/login" />;
};

const PrivateRoute: React.FC<RouteProps> = ({ element, ...restProps }) => {
  const isAuthenticated = checkAuthentication();

  if(isAuthenticated) {
    return <Outlet />;
  }
  
  return <RedirectToLogout />;
};
export default PrivateRoute;
