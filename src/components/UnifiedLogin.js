import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";


export default async function UnifiedLogin() {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

};
