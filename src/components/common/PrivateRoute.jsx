import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../services/auth";

function PrivateRoute({ children }) {
  const location = useLocation();
  const token = auth.getJwt();
  return token ? (
    children
  ) : (
    <Navigate to={"/login"} replace state={{ from: location.pathname }} />
  );
}

export default PrivateRoute;
