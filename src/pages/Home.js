import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    // State to store the ID of the last visited product
    const [lastVisitedProduct, setLastVisitedProduct] = useState(null);

    useEffect(() => {
        // Get the last visited product ID from local storage
        const lastProduct = localStorage.getItem('lastVisitedProduct');
        if (lastProduct) {
            setLastVisitedProduct(lastProduct); // Update state with the ID
        }
    }, []); // Empty dependency array means this runs only once on mount

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {lastVisitedProduct && (
                // Display link to return to the last visited product if there is one
                <div>
                    <Link to={`/product/${lastVisitedProduct}`}>
                        Wróć do przeglądania produktu
                    </Link>
                </div>
            )}
            <p>Wybierz "Products" aby przeglądać dostępne produkty.</p>
        </div>
    );
};
  
export default Home;
