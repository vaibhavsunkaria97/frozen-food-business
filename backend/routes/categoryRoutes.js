const express = require("express");
const Category = require("../models/categoryModel"); // Import the category model
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

module.exports = router;
