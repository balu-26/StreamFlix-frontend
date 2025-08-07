import React from 'react';
import '../styles.css'; // Correct relative path from components folder

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-logo">StreamFlix</div>
        <ul className="footer-links">
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Privacy</a></li>
        </ul>
        <p className="footer-copy">© {new Date().getFullYear()} StreamFlix. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
