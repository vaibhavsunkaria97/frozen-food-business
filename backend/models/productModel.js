const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category", // Reference the Category model
            required: true,
        },
        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
