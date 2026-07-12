import api from "./api";

const USER_KEY = "user";
const TOKEN_KEY = "token";

// Save user and token after login
export function saveUser(user, token) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

// Get logged in user from localStorage
export function getUser() {
  const userData = localStorage.getItem(USER_KEY);
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
}

// Get JWT token
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Remove user and token on logout
export function logoutUser() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

// Register a new user
export async function registerUser(username, email, password) {
  const response = await api.post("/register", {
    username,
    email,
    password,
  });
  return response.data;
}

// Login user
export async function loginUser(email, password) {
  const response = await api.post("/login", {
    email,
    password,
  });
  return response.data;
}
