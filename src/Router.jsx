import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Register from "./containers/Register";
import CreateItem from "./containers/CreateItem";
import ItemPage from "./containers/ItemPage";
import EditItem from "./containers/EditItem";
import ProfilePage from "./containers/ProfilePage";
import EditProfilePage from "./containers/EditProfilePage";
import ChangePassword from "./containers/ChangePassword";
import Unverified from "./containers/Unverified";
import ResetPassword from "./containers/ResetPassword";
import Search from "./containers/Search";
import ChangeEmail from "./containers/ChangeEmail";

export default function Router() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path='unverified' element={<Unverified />} />
      <Route path='resetPassword' element={<ResetPassword />} />

      {/* PROTECTED ROUTES */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="profile">
          <Route path=":username" element={<ProfilePage />} />
          <Route path="edit" element={<EditProfilePage />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="changeEmail" element={<ChangeEmail />} />
        </Route>
        <Route path="items">
          <Route path="create" element={<CreateItem />} />
          <Route path="search" element={<Search />} />
          <Route path=":itemId" element={<ItemPage />} />
          <Route path=":itemId/edit" element={<EditItem />} />
        </Route>
      </Route>

      {/* Default route */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};
