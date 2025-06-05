import React from "react";
import "./ProductList.css";

const ProductList = ({ products }) => {
    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItem = cart.find((item) => item.id === product._id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: product._id, name: product.name, price: product.price, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="product-grid">
            {products.map((product) => (
                <div className="product-card" key={product._id}>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <h3>{product.name}</h3>
                    <p>${product.price.toFixed(2)}</p>
                    <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
