const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("Received token:", token); // Debug log for token

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            console.log("Authenticated user:", req.user); // Debug log for user
            next();
        } catch (err) {
            console.error("Token verification failed:", err.message);
            res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
        }
    } else {
        console.error("No token provided");
        res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ success: false, message: "Admin access required" });
    }
};

module.exports = { protect, admin };

