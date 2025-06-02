// script.js — Core frontend logic for Pay Confirmed

// Base API URL from .env
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Helper: Fetch Wrapper
async function apiRequest(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options = {
    method,
    headers,
  };
  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'API Error');
    return data;
  } catch (err) {
    console.error('API Error:', err.message);
    alert(`Error: ${err.message}`);
    throw err;
  }
}

// Example: Login Form Handler
async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const data = await apiRequest('/api/auth/login', 'POST', { email, password });
    localStorage.setItem('token', data.token);
    window.location.href = '/dashboard.html';
  } catch (err) {
    console.error('Login Failed', err);
  }
}

// Example: Logout
function logoutUser() {
  localStorage.removeItem('token');
  window.location.href = '/index.html';
}

// Utility: Get Current Token
function getToken() {
  return localStorage.getItem('token');
}

// Attach Handlers on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutUser);
  }
});
