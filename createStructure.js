const fs = require("fs");
const path = require("path");

const folders = [
  "backend",
  "backend/config",
  "backend/controllers",
  "backend/models",
  "backend/routes",
  "backend/middlewares",
  "frontend",
  "frontend/public",
  "frontend/src",
  "frontend/src/components",
  "frontend/src/pages",
];

const files = {
  "backend/config/db.js": "",
  "backend/config/keys.js": "",
  "backend/controllers/adminController.js": "",
  "backend/controllers/orderController.js": "",
  "backend/controllers/productController.js": "",
  "backend/models/orderModel.js": "",
  "backend/models/productModel.js": "",
  "backend/models/userModel.js": "",
  "backend/routes/adminRoutes.js": "",
  "backend/routes/orderRoutes.js": "",
  "backend/routes/productRoutes.js": "",
  "backend/routes/userRoutes.js": "",
  "backend/middlewares/authMiddleware.js": "",
  "backend/server.js": "",
  "frontend/public/index.html": "<!DOCTYPE html><html><head><title>Frozen Food Business</title></head><body><div id='root'></div></body></html>",
  "frontend/src/App.js": "",
  "frontend/src/index.js": "",
  "frontend/src/components/Cart.js": "",
  "frontend/src/components/Checkout.js": "",
  "frontend/src/components/Footer.js": "",
  "frontend/src/components/Header.js": "",
  "frontend/src/components/Home.js": "",
  "frontend/src/components/ProductDetails.js": "",
  "frontend/src/components/ProductList.js": "",
  "frontend/src/pages/AdminDashboard.js": "",
  "frontend/src/pages/Login.js": "",
  "frontend/src/pages/OrderHistory.js": "",
  "frontend/src/pages/Register.js": "",
  "frontend/src/pages/TrackOrder.js": "",
};

folders.forEach((folder) => {
  fs.mkdirSync(folder, { recursive: true });
});

Object.entries(files).forEach(([file, content]) => {
  fs.writeFileSync(file, content, { encoding: "utf8" });
});

console.log("Folder structure created successfully!");
