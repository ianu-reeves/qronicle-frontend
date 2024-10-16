import axios from "../api/axios";
import {useNavigate} from "react-router-dom";
import useAuth from "./useAuth";

export default function useRefresh() {
  const REFRESH_URL_ENDPOINT = '/auth/refresh';
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  return async () => {
    await axios.post(REFRESH_URL_ENDPOINT, null, {
      withCredentials: true,
    })
    .then(result => {
      setCurrentUser(result.data.userDetails)
    })
    // clear user context & redirect to login page with error
    .catch(() => {
      setCurrentUser({});
      //TODO: set up error context & add error to it here for display on login page
      navigate('/login');
    });
  };
}
