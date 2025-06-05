const Order = require("../models/orderModel");
const axios = require("axios");
const crypto = require("crypto");



// Create a new order
exports.createOrder = async (req, res) => {
    const { orderItems, totalPrice, address, phone } = req.body;
    const user = req.user._id;

    try {
        if (!address || !phone) {
            return res.status(400).json({
                success: false,
                message: "Address and phone number are required.",
            });
        }

        const newOrder = await Order.create({
            user,
            products: orderItems,
            totalPrice,
            address,
            phone,
        });

        res.status(201).json({ success: true, order: newOrder });
    } catch (err) {
        console.error("Error creating order:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
};


// Get all orders for a user
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("products.productId");
        res.json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("products.productId");
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.status = status;
        const updatedOrder = await order.save();

        // Notify user (if notification system exists)
        res.json({ success: true, order: updatedOrder });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
