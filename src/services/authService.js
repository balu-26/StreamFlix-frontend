import axios from 'axios'; 

 const API_BASE = 'https://streamapi-d2a8adfjdphsb2dk.canadaeast-01.azurewebsites.net/api/auth';

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`${API_BASE}/login`, { email, password });

    if (res.data && res.data.username) {
      localStorage.setItem('username', res.data.username);
    }

    return true;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    return false;
  }
};

export const register = async ({ username, email, password }) => {
  try {
    const res = await axios.post(`${API_BASE}/register`, { username, email, password });

    localStorage.setItem('username', username); // Store for profile display
    return true;
  } catch (err) {
    console.error("Register failed:", err.response?.data || err.message);
    return false;
  }
};
