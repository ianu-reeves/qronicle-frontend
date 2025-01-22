import {Navigate, Outlet} from "react-router-dom";
import React, {useEffect} from "react";
import useAuth from "../hooks/useAuth";
import useRefresh from "../hooks/useRefresh";
import {CircularProgress, Typography} from "@mui/material";

export default function ProtectedRoutes() {
  const { currentUser, persistLogin } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const refresh = useRefresh();
  const hasAuth = () => {
    return currentUser && Object.keys(currentUser).length > 0;
  };

  useEffect(() => {
    let isMounted = true;
    const attemptRefresh = async () => {
      try {
        await refresh();
      } catch {
      } finally {
        isMounted && setLoading(false);
      }
    }
    !hasAuth() && persistLogin ? attemptRefresh() : setLoading(false);

    return () => {
      isMounted = false
    };
  }, [refresh, currentUser, persistLogin, setLoading]);

  return (
    <>
      {loading
          ? (
            <>
              <CircularProgress />
              <Typography>Loading... Please wait</Typography>
            </>
          )
          : currentUser.verified
            ? <Outlet />
            : <Navigate to='/unverified' />
      }
    </>
  )
};
