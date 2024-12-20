import * as React from "react";
import { Navigate, Outlet } from "react-router";
import { checkAuthentication } from "src/utils/auth";

const PublicRoute = () => {
  const isAuthenticated = checkAuthentication();

  if(isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
