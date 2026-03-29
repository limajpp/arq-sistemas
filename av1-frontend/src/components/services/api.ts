import axios from "axios";

export const API_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export default api;
