import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import React from "react";
import Test from "./containers/Test";
import Register from "./containers/Register";
import CreateItem from "./containers/CreateItem";

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
        <Route path="/items/create" element={<CreateItem />} />
      </Route>
    </Routes>
  );
};
