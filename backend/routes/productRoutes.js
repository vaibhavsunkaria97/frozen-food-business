const express = require("express");
const mongoose = require("mongoose");
const { protect, admin } = require("../middlewares/authMiddleware");
const Product = require("../models/productModel");

const router = express.Router();

// @route   GET /api/products
// @desc    Fetch all products or filter by category
router.get("/", async (req, res) => {
    const { category, includeInactive } = req.query;

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

        if (!includeInactive) {
            query.isActive = { $ne: false };
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

// @route   POST /api/products
// @desc    Create new product (admin only)
router.post("/", protect, admin, async (req, res) => {
    try {
        const product = new Product(req.body);
        const created = await product.save();
        res.status(201).json({ success: true, product: created });
    } catch (err) {
        console.error("Error creating product:", err.message);
        res.status(500).json({ success: false, message: "Failed to create product" });
    }
});

// @route   PUT /api/products/:id
// @desc    Update product (admin only)
router.put("/:id", protect, admin, async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product: updated });
    } catch (err) {
        console.error("Error updating product:", err.message);
        res.status(500).json({ success: false, message: "Failed to update product" });
    }
});



module.exports = router;
