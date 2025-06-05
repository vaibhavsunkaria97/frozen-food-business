const mongoose = require("mongoose");
const Product = require("./models/productModel");
const Category = require("./models/categoryModel");

const products = [
    {
        name: "Frozen Broccoli",
        description: "Freshly frozen broccoli florets.",
        price: 2.99,
        category: "Vegetables",
        stock: 50,
        image: "https://via.placeholder.com/150",
    },
    {
        name: "Frozen Strawberries",
        description: "Whole frozen strawberries, perfect for desserts.",
        price: 4.99,
        category: "Fruits",
        stock: 30,
        image: "https://via.placeholder.com/150",
    },
];

const categories = [
    { name: "Vegetables", description: "Freshly frozen vegetables." },
    { name: "Fruits", description: "Frozen fruits for smoothies and desserts." },
];

const seedData = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/frozen-food-business", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await Product.deleteMany({});
        await Product.insertMany(products);

        await Category.deleteMany({});
        await Category.insertMany(categories);

        console.log("Data seeded successfully!");
        process.exit();
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

seedData();
