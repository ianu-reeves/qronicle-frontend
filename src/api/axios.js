import axios from "axios";

const BASE_URL = 'http://52.42.122.118:8080/QRonicle-1.4-DEPLOY/';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
