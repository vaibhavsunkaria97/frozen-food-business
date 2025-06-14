import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data.product);
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find((item) => item.id === product._id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id: product._id, name: product.name, price: product.price, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
        alert(`${product.name} added to cart!`);
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-details">
            <img src={product.image} alt={product.name} className="details-image" />
            <div className="details-info">
                <h1>{product.name}</h1>
                <p className="details-description">{product.description}</p>
                <p className="details-price">${product.price.toFixed(2)}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductDetails;
