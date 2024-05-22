import {useContext} from "react";
import UserContext from "../context/AuthProvider";

export default function useAuth() {
  return useContext(UserContext);
}
