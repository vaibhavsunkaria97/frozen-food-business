import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrderHistory from "./pages/OrderHistory";
import TrackOrder from "./pages/TrackOrder";
import AdminDashboard from "./pages/AdminDashboard";
import ManageProducts from "./pages/ManageProducts";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext"; // Import AuthProvider

const App = () => {
    return (
        <AuthProvider>
            <Router>
                
                <main className="container golden-container">
                  <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/order-history" element={<OrderHistory />} />
                        <Route path="/track-order/:id" element={<TrackOrder />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/manage-products" element={<ManageProducts />} />
                    </Routes>
                </main>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;
