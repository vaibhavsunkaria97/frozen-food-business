// backend/seed.js

// 1) Load environment variables
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// 2) Import your Mongoose models
const Category = require("./models/categoryModel");
const Product = require("./models/productModel");
// If you also seed users/orders, import them here:
// const User = require("./models/userModel");
// const Order = require("./models/orderModel");

// 3) Define your sample data

// Categories: simple name/description pairs
const sampleCategories = [
  { name: "Vegetables", description: "Freshly frozen vegetables." },
  { name: "Fruits", description: "Frozen fruits for smoothies and desserts." },
];

// Products: temporarily hold 'categoryName' (string) rather than ObjectId
const sampleProducts = [
  {
    name: "Frozen Broccoli",
    description: "Freshly frozen broccoli florets.",
    price: 2.99,
    categoryName: "Vegetables", // will map to ObjectId below
    stock: 50,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Frozen Strawberries",
    description: "Whole frozen strawberries, perfect for desserts.",
    price: 4.99,
    categoryName: "Fruits",    // will map to ObjectId below
    stock: 30,
    image: "https://via.placeholder.com/150",
  },
];

// (Optional) If you want to seed users, you can define them here:
// const bcrypt = require("bcryptjs");
// const sampleUsers = [
//   {
//     name: "Admin User",
//     email: "admin@example.com",
//     password: bcrypt.hashSync("admin123", 10),
//     isAdmin: true,
//   },
//   {
//     name: "Regular User",
//     email: "user@example.com",
//     password: bcrypt.hashSync("userpassword", 10),
//   },
// ];

// 4) Main import function
const importData = async () => {
  try {
    // 4a) Connect to MongoDB Atlas (no need for useNewUrlParser/useUnifiedTopology)
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // 4b) Clear existing documents from collections
    await Category.deleteMany({});
    await Product.deleteMany({});
    // If you seed users/orders:
    // await User.deleteMany({});
    // await Order.deleteMany({});

    // 4c) Insert sample categories first
    const createdCategories = await Category.insertMany(sampleCategories);
    console.log("Categories inserted:", createdCategories.map((c) => c.name));

    // 4d) Build a map from category name → ObjectId
    // Example: { "Vegetables": ObjectId("…"), "Fruits": ObjectId("…") }
    const categoryMap = {};
    createdCategories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });

    // 4e) Transform sampleProducts to reference the real category ObjectIds
    const productsWithIds = sampleProducts.map((prod) => ({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      category: categoryMap[prod.categoryName], // now an ObjectId
      stock: prod.stock,
      image: prod.image,
    }));

    // 4f) Insert products using category ObjectIds
    const createdProducts = await Product.insertMany(productsWithIds);
    console.log("Products inserted:", createdProducts.map((p) => p.name));

    // (Optional) 4g) Insert users
    // const createdUsers = await User.insertMany(sampleUsers);
    // console.log("Users inserted:", createdUsers.map((u) => u.email));

    console.log("✔️  Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error during data import:", error);
    process.exit(1);
  }
};

// 5) Optional: allow passing "-d" to destroy data
const destroyData = async () => {
  try {
    await Category.deleteMany({});
    await Product.deleteMany({});
    // await User.deleteMany({});
    // await Order.deleteMany({});
    console.log("✔️  Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error("❌ Error during data destroy:", error);
    process.exit(1);
  }
};

// 6) Determine which function to run
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
