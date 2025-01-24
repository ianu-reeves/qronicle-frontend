import axios from "axios";

const BASE_URL = 'https://18.237.89.92:8443//QRonicle-1.4-DEPLOY/';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
