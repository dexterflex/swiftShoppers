import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../productCard/ProductCard';
import './product.css';

// Products component to fetch and display a list of products
const Products = ({ name, url }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]); // State to hold fetched products
    const [isLoading, setIsLoading] = useState(true); // State to handle loading status

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${url}?limit=4`);
                const parseJson = await response.json();
                setProducts(parseJson.products); // Update state with fetched products
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching
            }
        };

        fetchProducts(); // Call the fetch function
    }, [url]); // Dependency array to refetch if the URL changes

    // Render loading state or products
    return (
        <div className='products_container'>
            <div className='more_products'>
                {/* Button to navigate to search page for more products */}
                <button onClick={() => navigate('/search', { state: { url } })}>View More</button>
            </div>
            <div className='products'>
                <div className='products_heading'>
                    <h3>{name}</h3>
                </div>
                {/* Show loading message or product cards */}
                {isLoading ? (
                    <p>Loading products...</p> // Loading message
                ) : (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                )}
            </div>
        </div>
    );
};

export default Products;
