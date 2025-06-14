import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [reviewData, setReviewData] = useState({ name: "", rating: 5, comment: "" });

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data.product);
            setSelectedImage(data.product.image);
        };
        const fetchReviews = async () => {
            const { data } = await axios.get(`/api/products/${id}/reviews`);
            setReviews(data.reviews);
            setAvgRating(data.avgRating);
        };
        fetchProduct();
        fetchReviews();
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

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`/api/products/${id}/reviews`, reviewData);
        setReviewData({ name: "", rating: 5, comment: "" });
        const { data } = await axios.get(`/api/products/${id}/reviews`);
        setReviews(data.reviews);
        setAvgRating(data.avgRating);
    };

    if (!product) return <p>Loading...</p>;

    const images = [product.image, ...(product.images || [])];

    return (
        <div className="product-details">
            <div className="image-section">
                <img src={selectedImage} alt={product.name} className="details-image" />
                <div className="image-carousel">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt="thumb"
                            className={`thumb ${selectedImage === img ? 'active' : ''}`}
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}
                </div>
                {product.videoUrl && (
                    <div className="video-wrapper">
                        <iframe
                            src={product.videoUrl}
                            title="video"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </div>
            <div className="details-info">
                <h1>{product.name}</h1>
                <p className="details-price">${product.price.toFixed(2)}</p>
                <button onClick={handleAddToCart} disabled={product.stock === 0}>
                    {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                </button>
                <details>
                    <summary>Description</summary>
                    <p className="details-description">{product.description}</p>
                </details>
                {product.howToUse && (
                    <details>
                        <summary>How to Use</summary>
                        <p>{product.howToUse}</p>
                    </details>
                )}
                {product.nutrition && (
                    <details>
                        <summary>Nutrition</summary>
                        <p>{product.nutrition}</p>
                    </details>
                )}
                {product.storage && (
                    <details>
                        <summary>Storage</summary>
                        <p>{product.storage}</p>
                    </details>
                )}
                <details>
                    <summary>Reviews (Avg: {avgRating.toFixed(1)})</summary>
                    {reviews.map((r) => (
                        <div key={r._id} className="review-item">
                            <strong>{r.name}</strong> - {"★".repeat(r.rating)}
                            <p>{r.comment}</p>
                        </div>
                    ))}
                </details>
                <form onSubmit={handleReviewSubmit} className="review-form">
                    <input
                        placeholder="Name"
                        value={reviewData.name}
                        onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                        required
                    />
                    <select
                        value={reviewData.rating}
                        onChange={(e) => setReviewData({ ...reviewData, rating: Number(e.target.value) })}
                    >
                        {[1,2,3,4,5].map(n => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                    <textarea
                        placeholder="Comment"
                        value={reviewData.comment}
                        onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    />
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default ProductDetails;
