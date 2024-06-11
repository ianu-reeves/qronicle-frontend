import {axiosPrivate} from "../api/axios";
import {useEffect} from 'react';
import useAuth from "./useAuth";

import {useNavigate} from "react-router-dom";
import useRefresh from "./useRefresh";


export default function useAxiosPrivate() {
  const {setCurrentUser} = useAuth();
  const refresh = useRefresh();
  const navigate = useNavigate();

  useEffect(() => {
    const responseIntercept = axiosPrivate.interceptors.response.use(
      // all is fine; proceed as normal
      resp => resp,
      async (err) => {
        const req = err?.config;
        // unauthorized; attempt to refresh tokens
        if (err?.response?.status === 401 && !req?.attempted) {
          req.attempted = true;
          await refresh();
          return axiosPrivate(req);
        }
        return Promise.reject(err);
      }
    )
    return () => axiosPrivate.interceptors.response.eject(responseIntercept);
  }, [refresh, navigate, setCurrentUser]);

  return axiosPrivate;
};
