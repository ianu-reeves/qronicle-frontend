import axios, {axiosPrivate} from "../api/axios";
import {useEffect} from 'react';
import useAuth from "./useAuth";

import {useNavigate} from "react-router-dom";

const REFRESH_URL_ENDPOINT = '/auth/refresh';

export default function useAxiosPrivate() {
  const {setCurrentUser} = useAuth();
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
          await axios.post(REFRESH_URL_ENDPOINT, null, {
            withCredentials: true,
          })
          .then(result => {
            setCurrentUser(result.data)
          })
          // clear user context & redirect to login page with error
          .catch((err) => {
            setCurrentUser({});
            //TODO: set up error context & add error to it here for display on login page
            navigate('/login');
          })
          return axiosPrivate(req);
        }
        return Promise.reject(err);
      }
    )

    return () => axiosPrivate.interceptors.response.eject(responseIntercept);
  }, [navigate, setCurrentUser]);

  return axiosPrivate;
};
