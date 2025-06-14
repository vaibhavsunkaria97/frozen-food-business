import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section footer-contact">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <i className="fas fa-envelope"></i>
            <a href="mailto:talietsai@gmail.com">talietsai@gmail.com</a>
          </div>
          <div className="contact-item">
            <i className="fas fa-phone"></i>
            <a href="tel:+1234567890">+1 234 567 890</a>
          </div>
        </div>
        <div className="footer-section footer-subscribe">
          <h3>Subscribe to our newsletter</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="footer-section footer-social">
          <a href="#" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
            <span>Facebook</span>
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
            <span>Instagram</span>
          </a>
          <a href="#" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
            <span>YouTube</span>
          </a>
          <a href="#" aria-label="Line">
            <i className="fab fa-line"></i>
            <span>Line</span>
          </a>
        </div>
      </div>
      <p className="footer-bottom">
        © 2024 Frozen Food Business. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;