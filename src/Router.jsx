import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Test from "./containers/Test";
import Register from "./containers/Register";
import CreateItem from "./containers/CreateItem";
import ItemPage from "./containers/ItemPage";
import EditItem from "./containers/EditItem";
import ProfilePage from "./containers/ProfilePage";
import EditProfilePage from "./containers/EditProfilePage";
import ChangePassword from "./containers/ChangePassword";

export default function Router() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="test" element={<Test />} />
        <Route path="profile">
          <Route path=":username" element={<ProfilePage />} />
          <Route path="edit" element={<EditProfilePage />} />
          <Route path="changePassword" element={<ChangePassword />} />
        </Route>
        <Route path="items">
          <Route path="create" element={<CreateItem />} />
          <Route path=":itemId" element={<ItemPage />} />
          <Route path=":itemId/edit" element={<EditItem />} />
        </Route>
      </Route>

      {/* Default route */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};
