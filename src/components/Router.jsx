import {Route, Routes} from "react-router-dom";
import Home from "../containers/Home";
import Login from "../containers/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import React from "react";

export default function Router() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/test" element={<Home />} />
      </Route>
    </Routes>
  );
};
