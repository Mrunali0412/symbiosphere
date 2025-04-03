// frontend/src/utils/auth.js

// Key used to store the token in local storage
const TOKEN_KEY = 'symbiosphere_token';

// Function to get the JWT token from local storage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Function to set the JWT token in local storage
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Function to clear the JWT token from local storage
export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Function to check if the user is authenticated (token exists)
export const isAuthenticated = () => {
  return !!getToken();
};

// Function to get the user ID from the token (if stored in the token)
// Note: This assumes your backend includes userId in the JWT payload
export const getUserId = () => {
  const token = getToken();
  if (token) {
    try {
      // Basic decoding of the JWT payload (not verifying signature!)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const payload = JSON.parse(jsonPayload);
      return payload.userId; // Assuming 'userId' is the claim name
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};

// Function to get the entire decoded token payload (use with caution)
export const getDecodedToken = () => {
  const token = getToken();
  if (token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};
