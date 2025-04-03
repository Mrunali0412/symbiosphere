// frontend/src/services/api.js

const API_BASE_URL = '/'; // Assuming your backend is running on the same domain as your frontend during development.
                         // You might need to adjust this for production.

// Authentication
export const registerUser = async (username, email, password) => {
  const response = await fetch(`${API_BASE_URL}register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Registration failed');
  }
  return response.json();
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }
  return response.json();
};

// Environmental Data
export const fetchEnvironmentalData = async (token) => {
  const response = await fetch(`${API_BASE_URL}environmental-data`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch environmental data');
  }
  return response.json();
};

export const postEnvironmentalData = async (data, token) => {
  const response = await fetch(`${API_BASE_URL}environmental-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add environmental data');
  }
  return response.json();
};

// Locations
export const fetchLocations = async (token) => {
  const response = await fetch(`${API_BASE_URL}locations`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch locations');
  }
  return response.json();
};

export const postLocation = async (data, token) => {
  const response = await fetch(`${API_BASE_URL}locations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add location');
  }
  return response.json();
};

// You can add more API functions here for PUT, DELETE requests, etc.
