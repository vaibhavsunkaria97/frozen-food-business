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
        images: [],
        howToUse: "",
        nutrition: "",
        storage: "",
        videoUrl: "",
    });
    const [alert, setAlert] = useState({ message: "", type: "" });

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setProductData({ ...productData, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        Promise.all(files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        })).then((imgs) => {
            setProductData({ ...productData, images: imgs });
        });
    };

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => setAlert({ message: "", type: "" }), 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    const createCategory = async (e) => {
        e.preventDefault();
        if (!categoryName) return;
        if (categories.some((c) => c.name.toLowerCase() === categoryName.toLowerCase())) {
            setAlert({ message: "Category already exists", type: "error" });
            return;
        }
        try {
            await axios.post(
                "http://localhost:5000/api/categories",
                { name: categoryName },
                authHeader
            );
            setAlert({ message: "Category added successfully!", type: "success" });
            setCategoryName("");
            fetchCategories();
        } catch (err) {
            setAlert({ message: "Failed to add category", type: "error" });
        }
    };

    const createProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                "http://localhost:5000/api/products",
                { ...productData },
                authHeader
            );
            setAlert({ message: "Product created successfully!", type: "success" });
            setProductData({
                name: "",
                description: "",
                price: "",
                category: "",
                stock: "",
                image: "",
                images: [],
                howToUse: "",
                nutrition: "",
                storage: "",
                videoUrl: "",
            });
            fetchProducts();
        } catch (err) {
            setAlert({ message: "Failed to create product", type: "error" });
        }
    };

    const toggleActive = async (id, isActive) => {
        try {
            await axios.put(
                `http://localhost:5000/api/products/${id}`,
                { isActive: !isActive },
                authHeader
            );
            setAlert({ message: "Product status updated", type: "success" });
            fetchProducts();
        } catch (err) {
            setAlert({ message: "Failed to update product", type: "error" });
        }
    };

    return (
        <div className="manage-container container golden-container">
            <h1>Product Management</h1>
            {alert.message && (
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}

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
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {productData.image && (
                        <img src={productData.image} alt="preview" style={{ maxWidth: "100px" }} />
                    )}
                    <input type="file" accept="image/*" multiple onChange={handleImagesChange} />
                    {productData.images.length > 0 && (
                        <div className="preview-list">
                            {productData.images.map((img, i) => (
                                <img key={i} src={img} alt="preview" style={{ maxWidth: "60px", marginRight: '5px' }} />
                            ))}
                        </div>
                    )}
                    <textarea
                        placeholder="How to use"
                        value={productData.howToUse}
                        onChange={(e) => setProductData({ ...productData, howToUse: e.target.value })}
                    />
                    <textarea
                        placeholder="Nutrition info"
                        value={productData.nutrition}
                        onChange={(e) => setProductData({ ...productData, nutrition: e.target.value })}
                    />
                    <textarea
                        placeholder="Storage instructions"
                        value={productData.storage}
                        onChange={(e) => setProductData({ ...productData, storage: e.target.value })}
                    />
                    <input
                        placeholder="YouTube video URL"
                        value={productData.videoUrl}
                        onChange={(e) => setProductData({ ...productData, videoUrl: e.target.value })}
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
