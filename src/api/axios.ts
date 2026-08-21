import axios from "axios";
import { getAccessToken, removeAccessToken } from "../utils/authStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized request");
      // Clear stored token
      removeAccessToken();

      // Clear stored user (if you're storing it)
      localStorage.removeItem("user");

      // Prevent redirect loop if already on login
      if (!window.location.hash.includes("/login")) {
        window.location.hash = "#/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;