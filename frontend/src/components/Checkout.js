import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState({
        items: [],
        total: 0,
    });
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("user");
        if (!isLoggedIn) {
            alert("You must register or log in to proceed!");
            navigate("/register");
        } else {
            const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
            const totalCost = cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );
            setOrderDetails({
                items: cartItems,
                total: totalCost,
            });
        }
    }, [navigate]);

    const handlePayment = async () => {
        if (!address || !phone) {
            alert("Please enter a valid address and phone number.");
            return;
        }

        // Validate phone number
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        alert("Payment Successful!");

        // Get logged-in user and token
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token"); // Retrieve token from localStorage

        // Ensure cart items include productId
        const formattedOrderItems = orderDetails.items.map((item) => ({
            productId: item.id, // Assuming `productId` is available in cart items
            name: item.name,
            quantity: item.quantity,
            price: item.price,
        }));

        try {
            const response = await axios.post(
                "http://localhost:5000/api/orders",
                {
                    userId: user._id,
                    orderItems: formattedOrderItems, // Send correctly formatted order items
                    totalPrice: orderDetails.total,
                    address,
                    phone, // Include address and phone in the order
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token in Authorization header
                    },
                }
            );

            alert("Order created successfully!");
            console.log("Order Response:", response.data);

            // Clear cart and navigate to order confirmation page
            localStorage.removeItem("cart");
            navigate("/order-confirmation");
        } catch (error) {
            console.error("Error creating order:", error.message);
            alert("Failed to create order. Please try again.");
        }
    };

    return (
        <div className="checkout-container container golden-container">
            <h1>Checkout</h1>
            <div className="order-summary">
                <h2>Order Summary</h2>
                {orderDetails.items.length > 0 ? (
                    <ul>
                        {orderDetails.items.map((item, index) => (
                            <li key={index}>
                                <span>{item.name}</span>
                                <span>Qty: {item.quantity}</span>
                                <span>Price: ${item.price.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items in the cart.</p>
                )}
                <h3>Total: ${orderDetails.total.toFixed(2)}</h3>
            </div>
            <div className="delivery-details">
                <h2>Delivery Details</h2>
                <label>
                    Address:
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter your delivery address"
                        required
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter your 10-digit phone number"
                        required
                    />
                </label>
            </div>
            <button className="pay-button" onClick={handlePayment}>
                Pay Now
            </button>
        </div>
    );
};

export default Checkout;
