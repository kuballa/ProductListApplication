import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortType, setSortType] = useState('default');

    useEffect(() => {
        // Fetch products from API on component mount
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                setProducts(json);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch products:', error);
                setLoading(false);
            });
    }, []);

    const sortProducts = (type) => {
        const sorted = [...products];
        if (type === 'title') {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (type === 'price') {
            sorted.sort((a, b) => a.price - b.price);
        }
        setSortType(type);
        setProducts(sorted);
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    return (
        <div>
            <h1>Product List</h1>
            {/* Sorting dropdown */}
            <select onChange={(e) => sortProducts(e.target.value)} value={sortType}>
                <option value="default">Default</option>
                <option value="title">Title</option>
                <option value="price">Price</option>
            </select>
            <ul>
                {/* Render product list */}
                {products.map(product => (
                    <li key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <img src={product.image} alt={product.title} width="50" />
                            <h3>{product.title}</h3>
                            <p>${product.price}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
  
export default Products;