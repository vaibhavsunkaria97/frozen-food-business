// src/components/Home.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import heroImage from "../images/hero-dumpling.jpg";
import "../index.css";
import "./Home.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch categories (use full URL to avoid proxy issues)
    axios
      .get("http://localhost:5000/api/categories")
      .then(({ data }) => {
        setCategories(data.categories || []);
        if (data.categories?.length) {
          setSelectedCategory(data.categories[0]._id);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));

    // Fetch top recommendations
    axios
      .get("http://localhost:5000/api/products/recommendations")
      .then(({ data }) => setRecommendations(data.products || []))
      .catch((err) => console.error("Error fetching recommendations:", err));
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    // Fetch products for selected category
    axios
      .get(
        `http://localhost:5000/api/products?category=${selectedCategory}`
      )
      .then(({ data }) => setProducts(data.products || []))
      .catch((err) => console.error("Error fetching products:", err));
  }, [selectedCategory]);

  return (
    <div className="home-container container golden-container">
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-content">
          <h1>Discover Gourmet Frozen Delights</h1>
          <p>Quality meals and snacks delivered straight to your freezer.</p>
          <button
            className="shop-now"
            onClick={() => setSelectedCategory(categories[0]?._id)}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* About Us */}
      <section className="about-us">
        <h2>About Us</h2>
        <p>
          We curate premium frozen foods from trusted suppliers so you can enjoy
          restaurant‑quality meals at home. Our mission is to make healthy eating
          simple, convenient and exciting for everyone.
        </p>
      </section>

      {/* Our Journey */}
      <section className="our-journey">
        <h2>Our Journey</h2>
        <p>
          Since launching in 2020 as a family business, we’ve expanded nationwide
          while staying true to our commitment to quality ingredients and sustainable practices.
        </p>
      </section>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section className="recommendations">
          <h2>Top Recommendations for You</h2>
          <ProductList products={recommendations} />
        </section>
      )}

      {/* Category Pills */}
      <section className="categories-section">
        <div className="categories-scroll">
          {categories.map((cat) => (
            <button
              key={cat._id}
              className={`category-pill ${
                selectedCategory === cat._id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(cat._id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products List */}
      <section className="products-section">
        <h2>Products</h2>
        <ProductList products={products} />
      </section>
    </div>
  );
};

export default Home;
