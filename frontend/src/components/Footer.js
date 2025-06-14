import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-content">
                <div className="footer-section contact">
                    <h4>Contact Us</h4>
                    <p>email@example.com</p>
                </div>
                <div className="footer-section subscribe">
                    <h4>Subscribe</h4>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Your email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
                <div className="footer-section social">
                    <a href="#" aria-label="Facebook">
                        <i className="fab fa-facebook" />
                    </a>
                    <a href="#" aria-label="Instagram">
                        <i className="fab fa-instagram" />
                    </a>
                    <a href="#" aria-label="YouTube">
                        <i className="fab fa-youtube" />
                    </a>
                    <a href="#" aria-label="Line">
                        <i className="fab fa-line" />
                    </a>
                </div>
            </div>
            <p className="copyright">
                © 2024 Frozen Food Business. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
