import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const username = localStorage.getItem('username');
  const location = useLocation();
  const isBrowsePage = location.pathname === '/browse';

  return (
    <nav className="navbar">
      <Link to="/" className="logo">StreamFlix</Link>

      {username && (
        <div className="nav-right">
          {isBrowsePage && (
            <input
              type="text"
              className="navbar-search"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
          <Link to="/browse">Browse</Link>
          <Link to="/profile">Profile</Link>
        </div>
      )}

      {!username && (
        <div className="nav-right">
          <Link to="/login">Sign In</Link>
          
        </div>
      )}
    </nav>
  );
};

export default Navbar;
