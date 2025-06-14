import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

import "./Navbar.css";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State to handle mobile menu
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown for user actions
    const [cartCount, setCartCount] = useState(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    });
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
        setIsMenuOpen(false); // Close the menu after logout
    };

    useEffect(() => {
        const handleCartUpdate = () => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
        };

        window.addEventListener("cartUpdated", handleCartUpdate);
        return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-header">
                <div className="navbar-brand">
                    <Link to="/">Frozen Food Store</Link>
                </div>
                <button
                    className="hamburger-menu"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? "✖" : "☰"}
                </button>
            </div>
            <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/categories">Categories</Link>
                </li>
                <li className="cart-icon">
                    <Link to="/cart" aria-label="Cart">
                        <i className="fas fa-shopping-cart" />
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>
                </li>
                {user && (
                    <>
                        <li>
                            <Link to="/order-history">My Order History</Link>
                        </li>
                        {user.isAdmin && (
                            <>
                                <li>
                                    <Link to="/admin-dashboard">Admin Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/manage-products">Manage Products</Link>
                                </li>
                            </>
                        )}
                    </>
                )}
                {!user && (
                    <>
                        <li>
                            <button
                                className="login-button"
                                onClick={() => {
                                    navigate("/login");
                                    setIsMenuOpen(false);
                                }}
                            >
                                Login
                            </button>
                        </li>
                        <li>
                            <button
                                className="register-button"
                                onClick={() => {
                                    navigate("/register");
                                    setIsMenuOpen(false);
                                }}
                            >
                                Register
                            </button>
                        </li>
                    </>
                )}
                {user && (
                    <li className="user-dropdown">
                        <span
                            className="welcome"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            Welcome, {user.name}!
                        </span>
                        <ul className={`dropdown-menu ${isDropdownOpen ? "open" : ""}`}>
                            <li>
                                <button onClick={() => navigate("/profile")}>Profile</button>
                            </li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
