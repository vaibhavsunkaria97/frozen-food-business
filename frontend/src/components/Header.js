import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/">Frozen Food</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/order-history">Orders</Link>
                <Link to="/login">Login</Link>
            </nav>
        </header>
    );
};

export default Header;
