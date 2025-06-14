import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TrackOrder.css";

const TrackOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState(null);

    const statusStages = [
        { name: "Pending", icon: "🕒" },
        { name: "Processing", icon: "⚙️" },
        { name: "Shipped", icon: "🚚" },
        { name: "Delivered", icon: "📦" },
    ];

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Authentication token missing. Please log in.");
                    return;
                }

                const { data } = await axios.get(`http://localhost:5000/api/orders/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setOrder(data.order);
                setError(null);
            } catch (err) {
                console.error("Error fetching order details:", err.message);
                setError("Failed to fetch order details. Please try again.");
            }
        };

        fetchOrder();
    }, [id]);

    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!order) return <p>Loading order details...</p>;

    const currentStageIndex = statusStages.findIndex(stage => stage.name === order.status);

    return (
        <div className="track-order-container container golden-container">
            <h1>Track Your Order</h1>
            <div className="order-card">
                <h2>Order Details</h2>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
                <p><strong>Products:</strong></p>
                <ul className="product-list">
                    {order.products.map((product, index) => (
                        <li key={index}>
                            {product.productId?.name || product.name} - Qty: {product.quantity}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Status Tracker */}
            <div className="status-tracker">
                {statusStages.map((stage, index) => (
                    <div
                        key={index}
                        className={`status-step ${index <= currentStageIndex ? "active" : ""} ${
                            index === currentStageIndex ? "current" : ""
                        }`}
                    >
                        <div className="status-icon">{stage.icon}</div>
                        <p className="status-label">{stage.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrackOrder;
