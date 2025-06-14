import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext"; // Import AuthContext
import axios from "axios"; // Axios for API requests
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // State to manage errors
    const { login } = useContext(AuthContext); // Get login function from context
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        try {
            // Make the API call to log in
            const response = await axios.post("http://localhost:5000/api/users/login", {
                email,
                password,
            });

            const { user, token } = response.data;

            // Save the token and user in local storage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            // Update global auth state
            login(user);

            alert("Login successful!");
            navigate("/"); // Redirect to home page
        } catch (err) {
            console.error("Login failed:", err.response?.data?.message || err.message);
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-container container golden-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <p>
                Not a member? <Link to="/register">Register Now</Link>
            </p>
        </div>
    );
};

export default Login;
