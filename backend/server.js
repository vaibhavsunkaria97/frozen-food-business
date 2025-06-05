const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
connectDB();

// Routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes"); // Import categories route
const userRoutes = require("./routes/userRoutes");



app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes); 
app.use("/api/users", userRoutes); // Ensure this matches your API path

// Default Route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Server Error",
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
