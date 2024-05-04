import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import UserContext from "../context/AuthProvider";


export default function ProtectedRoutes() {
  const { user, setUser } = React.useContext(UserContext);
  const hasAuth = () => {
    return user && Object.keys(user).length > 0;
  };

  return hasAuth() ? <Outlet /> : <Navigate to="/login" />;
};
