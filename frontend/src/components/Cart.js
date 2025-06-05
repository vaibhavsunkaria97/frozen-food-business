import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );
    const navigate = useNavigate();

    const handleQuantityChange = (id, quantity) => {
        const updatedCart = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        navigate("/checkout");
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="cart-items">
                        {cartItems.map((item) => (
                            <li key={item.id} className="cart-item">
                                <div className="cart-item-details">
                                    <img src={item.image} alt={item.name} className="cart-item-image" />
                                    <div>
                                        <h4>{item.name}</h4>
                                        <p>${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="cart-item-actions">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) =>
                                            handleQuantityChange(item.id, parseInt(e.target.value, 10))
                                        }
                                    />
                                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h3>Total: ${calculateTotal()}</h3>
                        <button onClick={handleCheckout}>Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
