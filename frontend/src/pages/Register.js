import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const { data } = await axios.post("http://localhost:5000/api/users/register", {
                name,
                email,
                password,
            });

            // Save token and user info in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Registration successful!");
            navigate("/"); // Redirect to home page or another route
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required
                    />
                </div>
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
                <button type="submit">Register</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Register;
