import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5178/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(result.message);
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage(result.message || "Failed to reset password.");
      }
    } catch {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        {message && <div className="form-message">{message}</div>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>

        <div className="signup-link" style={{ marginTop: '1.5rem' }}>
          Go back to <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
