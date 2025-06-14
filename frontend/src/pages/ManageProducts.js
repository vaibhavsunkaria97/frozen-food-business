import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ManageProducts.css";

const ManageProducts = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
    });

    const token = localStorage.getItem("token");

    const authHeader = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const fetchCategories = async () => {
        const { data } = await axios.get("http://localhost:5000/api/categories");
        setCategories(data.categories || []);
    };

    const fetchProducts = async () => {
        const { data } = await axios.get(
            "http://localhost:5000/api/products?includeInactive=true"
        );
        setProducts(data.products || []);
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const createCategory = async (e) => {
        e.preventDefault();
        if (!categoryName) return;
        await axios.post(
            "http://localhost:5000/api/categories",
            { name: categoryName },
            authHeader
        );
        setCategoryName("");
        fetchCategories();
    };

    const createProduct = async (e) => {
        e.preventDefault();
        await axios.post(
            "http://localhost:5000/api/products",
            { ...productData },
            authHeader
        );
        setProductData({ name: "", description: "", price: "", category: "", stock: "", image: "" });
        fetchProducts();
    };

    const toggleActive = async (id, isActive) => {
        await axios.put(
            `http://localhost:5000/api/products/${id}`,
            { isActive: !isActive },
            authHeader
        );
        fetchProducts();
    };

    return (
        <div className="manage-container container">
            <h1>Product Management</h1>

            <section className="form-section">
                <h2>Create Category</h2>
                <form onSubmit={createCategory} className="category-form">
                    <input
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Category name"
                        required
                    />
                    <button type="submit">Add</button>
                </form>
            </section>

            <section className="form-section">
                <h2>Create Product</h2>
                <form onSubmit={createProduct} className="product-form">
                    <input
                        placeholder="Name"
                        value={productData.name}
                        onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={productData.description}
                        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={productData.price}
                        onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                        required
                    />
                    <select
                        value={productData.category}
                        onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Stock"
                        value={productData.stock}
                        onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Image URL"
                        value={productData.image}
                        onChange={(e) => setProductData({ ...productData, image: e.target.value })}
                        required
                    />
                    <button type="submit">Create Product</button>
                </form>
            </section>

            <section className="product-table">
                <h2>Existing Products</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p._id}>
                                <td>{p.name}</td>
                                <td>${p.price.toFixed(2)}</td>
                                <td>{p.stock}</td>
                                <td>{p.isActive ? "Active" : "Disabled"}</td>
                                <td>
                                    <button onClick={() => toggleActive(p._id, p.isActive)}>
                                        {p.isActive ? "Disable" : "Enable"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default ManageProducts;
