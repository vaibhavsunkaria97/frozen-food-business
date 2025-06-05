const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        totalPrice: { type: Number, required: true },
        address: { type: String, required: true }, // Ensure required
        phone: { type: String, required: true }, // Ensure required
        status: {
            type: String,
            enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
            default: "Pending",
        },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;