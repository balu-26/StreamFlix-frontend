import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5178/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("username", result.username);
        if (rememberMe) {
          localStorage.setItem("rememberMe", true);
        }
        setMessage(result.message || "Login successful.");
        navigate("/browse");
      } else {
        setMessage(result.message || "Login failed.");
      }
    } catch {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2 style={{ color: '#00ffd5', marginBottom: '1rem' }}>Sign In</h2>
        {message && <div className="form-message">{message}</div>}

        <input
          type="email"
          placeholder="Email or mobile number"
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

        <button type="submit">Sign In</button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            /> Remember me
          </label>
          <Link to="/forgot-password" style={{ fontSize: '0.9rem', color: '#00ffd5' }}>Forgot password?</Link>
        </div>

        <div style={{ marginTop: '2rem', fontSize: '0.9rem' }}>
          New to StreamFlix? <Link to="/register" style={{ color: '#00ffd5' }}>Sign up now.</Link>
        </div>

        <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#999' }}>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
          <Link to="#" style={{ color: '#00ffd5' }}>Learn more.</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
