const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", protect, createOrder); // Protect create order route
router.get("/", protect, getUserOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, updateOrderStatus);

module.exports = router;
