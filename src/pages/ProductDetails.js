import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetails = () => {
    // Get product ID from URL params
    const { id } = useParams();
    // State for product data and loading state
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch product details by ID
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(json => {
                setProduct(json); // Set product data
                setLoading(false); // Update loading state
                localStorage.setItem('lastVisitedProduct', id); // Save last visited product ID
            })
            .catch(error => {
                console.error("Failed to fetch product details:", error); // Log errors
                setLoading(false); // Update loading state
            });
    }, [id]); // Run effect when ID changes

    if (loading) {
        return <p>Loading product details...</p>; // Show loading message
    }

    if (!product) {
        return <p>Product not found.</p>; // Show error if product not found
    }

    return (
        <div>
            <h1>{product.title}</h1> {/* Product title */}
            <img src={product.image} alt={product.title} width="200" /> {/* Product image */}
            <p>{product.description}</p> {/* Product description */}
            <p>Category: {product.category}</p> {/* Product category */}
            <p>Price: ${product.price}</p> {/* Product price */}
            <p>Rating: {product.rating.rate} (based on {product.rating.count} reviews)</p> {/* Product rating */}
            <br />
            {/* Link to return to product list */}
            <Link to="/products">Wróć do listy produktów</Link>
        </div>
    );
};
  
export default ProductDetails;
