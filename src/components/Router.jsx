import {Route, Routes} from "react-router-dom";
import Home from "../containers/Home";
import Login from "../containers/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import React from "react";
import Test from "../containers/Test";
import Register from "../containers/Register";

export default function Router() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Route>
    </Routes>
  );
};
