import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
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

                const response = await axios.get("http://localhost:5000/api/admin/orders", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setOrders(response.data.orders || []);
                setFilteredOrders(response.data.orders || []);
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

    const updateOrderStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Authentication token missing. Please log in again.");
                return;
            }

            await axios.put(
                `http://localhost:5000/api/admin/orders/${id}/status`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Order status updated successfully!");
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === id ? { ...order, status } : order
                )
            );
        } catch (err) {
            console.error("Error updating order status:", err.message);
            alert("Failed to update order status. Please try again.");
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());

        const filtered = orders.filter((order) => {
            const orderId = order._id.toLowerCase();
            const username = order.user?.name?.toLowerCase() || "";
            const email = order.user?.email?.toLowerCase() || "";
            const phone = order.phone?.toLowerCase() || "";

            return (
                orderId.includes(searchQuery) ||
                username.includes(searchQuery) ||
                email.includes(searchQuery) ||
                phone.includes(searchQuery)
            );
        });

        setFilteredOrders(filtered);
    };

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    const orderStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    return (
        <div className="admin-dashboard-container container golden-container">
            <h1>Admin Dashboard</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by Order ID, Username, Email, or Phone"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            {filteredOrders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Delivery Details</th>
                            <th>Items</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>
                                    {order.user?.name || "N/A"} <br />
                                    <small>{order.user?.email || "N/A"}</small>
                                </td>
                                <td>
                                    <strong>Address:</strong> {order.address} <br />
                                    <strong>Phone:</strong> {order.phone}
                                </td>
                                <td>
                                    <ul className="items-list">
                                        {order.products.map((product, index) => (
                                            <li key={index}>
                                                <strong>{product.name}</strong> <br />
                                                Price: ${product.price.toFixed(2)} <br />
                                                Quantity: {product.quantity} <br />
                                                Subtotal: ${(product.price * product.quantity).toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>${order.totalPrice.toFixed(2)}</td>
                                <td>{order.status}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                        className={`status-picker ${
                                            order.status.toLowerCase().replace(" ", "-")
                                        }`}
                                    >
                                        {orderStatuses.map((status, index) => (
                                            <option key={index} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;
