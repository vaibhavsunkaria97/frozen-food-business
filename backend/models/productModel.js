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
        isActive: {
            type: Boolean,
            default: true,
        },
        image: {
            type: String,
            required: true,
        },
        images: [String],
        howToUse: { type: String },
        nutrition: { type: String },
        storage: { type: String },
        videoUrl: { type: String },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
