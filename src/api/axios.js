import axios from "axios";

const AUTH_SERVER_BASE_URL = 'http://localhost:8080';

export default axios.create({
  baseURL: AUTH_SERVER_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: AUTH_SERVER_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
