import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Watch from './pages/Watch';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';

// Context
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AuthProvider>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse searchTerm={searchTerm} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dynamic Movie Watch Route */}
        <Route path="/watch/:id" element={<Watch />} />

        {/* User Route */}
        <Route path="/profile" element={<Profile />} />

        {/* Admin Route */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Optional: 404 fallback */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      <Footer />
    </AuthProvider>
  );
};

export default App;
