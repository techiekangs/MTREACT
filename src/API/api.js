// src/api/api.js
import axios from "axios";

console.log("Base URL:", import.meta.env.VITE_API_BASE_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // read from .env
  headers: {
    "Content-Type": "application/json",
  },
});

// (optional) attach token automatically if stored in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
