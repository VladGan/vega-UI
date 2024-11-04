// src/utils/auth.ts

// Mock authentication function for logging in
export const login = (username: string, password: string): boolean => {
  // Replace with actual authentication logic or API request if needed
  if (username === 'admin' && password === 'admin') {
    localStorage.setItem('auth', 'true'); // Store authentication state in localStorage
    return true;
  }
  return false;
};

// Function to log the user out by clearing the auth data from localStorage
export const logout = () => {
  localStorage.removeItem('auth');
};

// Function to check if a user is authenticated based on localStorage
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('auth') === 'true';
};
