import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./OrderHistory.css";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Authentication token missing. Please log in again.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://localhost:5000/api/orders", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setOrders(response.data.orders || []);
                setError(null);
            } catch (err) {
                console.error("Error fetching orders:", err.message);
                setError("Failed to fetch orders. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading your orders...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="order-history-container container golden-container">
            <h1>Your Order History</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="orders-grid">
                    {orders
                        .slice()
                        .reverse() // Ensure latest orders are displayed first
                        .map((order) => (
                            <div key={order._id} className="order-card">
                                <h2>Order ID: {order._id}</h2>
                                <p>
                                    <strong>Status:</strong> {order.status}
                                </p>
                                <p>
                                    <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
                                </p>
                                <div>
                                    <h3>Items:</h3>
                                    <ul className="items-list">
                                        {order.products.map((product, index) => (
                                            <li key={index}>
                                                {product.name} - Qty: {product.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="track-order-section">
                                    {order.status !== "Delivered" && (
                                        <Link to={`/track-order/${order._id}`}>
                                            <button className="track-order-button">
                                                Track Order
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
