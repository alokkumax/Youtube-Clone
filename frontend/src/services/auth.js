// Simple helper functions for temporary frontend auth
const USER_KEY = "user";

// Save user to localStorage after login
export function saveUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Get logged in user from localStorage
export function getUser() {
  const userData = localStorage.getItem(USER_KEY);
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
}

// Remove user from localStorage on logout
export function logoutUser() {
  localStorage.removeItem(USER_KEY);
}
