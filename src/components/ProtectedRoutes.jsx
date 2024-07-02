import { Navigate, Outlet } from "react-router-dom";
import React, {useEffect} from "react";
import UserContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import useRefresh from "../hooks/useRefresh";
import {Typography} from "@mui/material";

//FIXME currently not storing credentials in context between reloads, but repopulates when access token expires
// and refresh hook fires. Properly redirects to login page if refresh token is expired when attempting this
export default function ProtectedRoutes() {
  const { currentUser, persistLogin } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const refresh = useRefresh();
  const hasAuth = () => {
    return currentUser && Object.keys(currentUser).length > 0;
  };

  useEffect(() => {
    let isMounted = true;
    const refreshSession = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setLoading(false);
      }
    }
    !hasAuth() && persistLogin ? refreshSession() : setLoading(false);

    return () => {
      isMounted = false
    };
  }, [refresh, currentUser, persistLogin, setLoading]);

  return (
    <>
      {
        !persistLogin
          ? <Outlet />
          : loading
            ? <Typography>Loading... Please wait...</Typography>
            : <Outlet />
      }
    </>
  )
};
