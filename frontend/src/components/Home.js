import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import "../index.css";
import "./Home.css";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [recommendations, setRecommendations] = useState([]); // State for recommendations

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/categories");
                setCategories(data.categories);
                if (data.categories.length > 0) {
                    setSelectedCategory(data.categories[0]._id); // Default to the first category
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    // Fetch products based on selected category
    useEffect(() => {
        const fetchProducts = async () => {
            if (selectedCategory) {
                try {
                    const { data } = await axios.get(
                        `http://localhost:5000/api/products?category=${selectedCategory}`
                    );
                    setProducts(data.products);
                } catch (err) {
                    console.error("Error fetching products:", err);
                }
            }
        };
        fetchProducts();
    }, [selectedCategory]);



    // Handle category change
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return (
        <div className="home-container container">
            <div className="hero">
                <h1>Welcome to Frozen Food Store</h1>
                <p>Quality frozen food delivered to your doorstep.</p>
            </div>

            {recommendations.length > 0 && (
                <div className="recommendations">
                    <h2>Top Recommendations for You</h2>
                    <ProductList products={recommendations} />
                </div>
            )}

            <div className="categories">
                {categories.map((category) => (
                    <button
                        key={category._id}
                        onClick={() => handleCategoryChange(category._id)}
                        className={selectedCategory === category._id ? "active" : ""}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <ProductList products={products} />
        </div>
    );
};

export default Home;
