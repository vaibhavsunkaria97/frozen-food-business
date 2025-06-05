const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Log incoming request body for debugging
        console.log("Incoming registration request:", req.body);

        // Validate input
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        if (password.length < 6) {
            return res
                .status(400)
                .json({ success: false, message: "Password must be at least 6 characters long" });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log(`User with email ${email} already exists.`);
            return res.status(400).json({
                success: false,
                message: "User already exists. Please log in.",
            });
        }

        // Create a new user
        const user = await User.create({ name, email, password });

        // Log the created user for debugging
        console.log("User created successfully:", user);

        // Respond with user data and token
        res.status(201).json({
            success: true,
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            token: generateToken(user._id),
        });
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ success: false, message: "Server error occurred" });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
