const express = require("express");
const mongoose = require("mongoose");
const { protect } = require("../middlewares/authMiddleware"); // Ensure protect is properly imported
const Product = require("../models/productModel");

const router = express.Router();

// @route   GET /api/products
// @desc    Fetch all products or filter by category
router.get("/", async (req, res) => {
    const { category } = req.query;

    try {
        let query = {};
        if (category) {
            // Validate category ID
            if (!mongoose.Types.ObjectId.isValid(category)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category ID",
                });
            }
            query.category = new mongoose.Types.ObjectId(category);
        }

        const products = await Product.find(query).populate("category");
        res.json({
            success: true,
            products,
        });
    } catch (err) {
        console.error("Error fetching products:", err.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
        });
    }
});



module.exports = router;
