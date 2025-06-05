const express = require("express");
const { getAllOrders, updateOrderStatus } = require("../controllers/adminController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Get all orders (Admin only)
router.get("/orders", protect, getAllOrders);

// Update order status (Admin only)
router.put("/orders/:id/status", protect, updateOrderStatus);

module.exports = router;
