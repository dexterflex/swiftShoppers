import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import './productcard.css';

const ProductCard = ({ index, product }) => {
    // State to track image loading status
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Handle successful image load
    const handleImageLoad = () => {
        setIsImageLoaded(true); // Update state to indicate image has loaded
    };

    return (
        <li className="product_card">
            <div className="product_image_container">
                {/* Show loader while image is loading */}
                {!isImageLoaded && (
                    <div className="image_placeholder">
                        <GridLoader
                            color="#81afdd"
                            size={5} // Size of the loader
                        />
                    </div>
                )}
                {/* Product image */}
                <img
                    src={product.images[0]} // Get the first image from the product's images array
                    alt={product.title} // Accessibility: use product title as alt text
                    className={`product_image ${isImageLoaded ? 'loaded' : 'loading'}`} // Conditional class for styling
                    onLoad={handleImageLoad} // Set loading state when image loads
                />
            </div>

            {/* Link to product details page */}
            <NavLink to={`/products/${product.id}`}>
                <div className="product_details">
                    <p className="product_brand">{product.brand}</p>
                    <h3 className="product_title poppins-medium">{product.title}</h3>
                    <small className="product_rating">
                        ⭐ {Math.round(product.rating)} ({product.stock} left) {/* Display product rating and stock */}
                    </small>
                    <p className="product_price">${product.price.toFixed(2)}</p>
                    {product.discountPercentage && (
                        <p className="product_discount">
                            Discount: {product.discountPercentage.toFixed(2)}% {/* Display discount if available */}
                        </p>
                    )}
                </div>
            </NavLink>
        </li>
    );
};

export default ProductCard;
