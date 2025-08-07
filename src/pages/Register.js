import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
 // Replace with your actual CSS path

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5178/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.text();

      if (response.ok) {
        setMessage(result || 'Registration successful.');
        setTimeout(() => navigate('/login'), 1000);
      } else {
        setMessage(result || 'Registration failed.');
      }
    } catch {
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2 style={{ color: '#00ffd5', marginBottom: '1rem' }}>Sign Up</h2>
        {message && (
          <div className="form-message" style={{ color: '#f66', marginBottom: '1rem' }}>
            {message}
          </div>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>

        <div style={{ marginTop: '1.5rem', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#00ffd5' }}>Sign in now.</Link>
        </div>

        <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#999' }}>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
          <Link to="#" style={{ color: '#00ffd5' }}>Learn more.</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
