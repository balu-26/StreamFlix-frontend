import axios from 'axios';

const API_BASE = 'http://localhost:5178/api/auth'; // ✅ Updated to match your .NET backend port

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post('http://localhost:5178/api/auth/login', { email, password });

    if (res.data && res.data.username) {
      localStorage.setItem('username', res.data.username);
    }

    return true;
  } catch {
    return false;
  }
};


export const register = async ({ username, email, password }) => {
  try {
    const res = await axios.post(`${API_BASE}/register`, { username, email, password });

    localStorage.setItem('username', username); // Store for profile display
    return true;
  } catch (err) {
    console.error("Register failed:", err);
    return false;
  }
};
