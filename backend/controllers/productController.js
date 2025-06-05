const Product = require("../models/productModel");
const Order = require("../models/orderModel");


// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, products });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get Product By ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

