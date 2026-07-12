import axios from "axios";

// Backend API base URL
const API_URL = "http://localhost:5000";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add JWT token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
