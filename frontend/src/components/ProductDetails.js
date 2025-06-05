import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`);
            setProduct(data.product);
        };
        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;
