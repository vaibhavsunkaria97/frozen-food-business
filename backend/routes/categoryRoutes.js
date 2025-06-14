const express = require("express");
const Category = require("../models/categoryModel");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch all categories
        res.json({ success: true, categories });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Create new category (admin only)
router.post("/", protect, admin, async (req, res) => {
    try {
        const exists = await Category.findOne({ name: req.body.name });
        if (exists) {
            return res.status(400).json({ success: false, message: "Category already exists" });
        }
        const category = new Category(req.body);
        const created = await category.save();
        res.status(201).json({ success: true, category: created });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
