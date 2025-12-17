import axios from "axios";
const emilynBase = import.meta.env.VITE_API_URL || "http://localhost:5000";
const emilynApi = axios.create({
  baseURL: `${emilynBase}/api/emilyn`,
  headers: {
    "Content-Type": "application/json",
  },
});
emilynApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("emilyn_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default emilynApi;