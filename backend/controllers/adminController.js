const Order = require("../models/orderModel");

// Fetch all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email"); // Optionally populate user details
        res.json({ success: true, orders });
    } catch (err) {
        console.error("Error fetching orders:", err.message);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.status = status;
        const updatedOrder = await order.save();

        res.json({ success: true, message: "Order status updated successfully", order: updatedOrder });
    } catch (err) {
        console.error("Error updating order status:", err.message);
        res.status(500).json({ success: false, message: "Failed to update order status" });
    }
};
