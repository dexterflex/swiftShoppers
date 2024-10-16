import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import './productcard.css';

const ProductCard = ({ index, product }) => {
    // Image loading state
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Handle image load success
    const handleImageLoad = () => {
        setIsImageLoaded(true);
    };

    return (
        <li className="product_card">
            <div className="product_image_container">
                {!isImageLoaded && (
                    <div className="image_placeholder">
                        <GridLoader
                            color="#81afdd"
                            size={5}
                        />
                    </div>
                )}
                <img
                    src={product.images[0]}
                    alt={product.title}
                    className={`product_image ${isImageLoaded ? 'loaded' : 'loading'}`}
                    onLoad={handleImageLoad}
                />
            </div>

            <NavLink to={`/products/${product.id}`}>
                <div className="product_details">
                    <p className="product_brand">{product.brand}</p>
                    <h3 className="product_title poppins-medium">{product.title}</h3>
                    <small className="product_rating">
                        ⭐ {Math.round(product.rating)} ({product.stock} left)
                    </small>
                    <p className="product_price">${product.price.toFixed(2)}</p>
                    {product.discountPercentage && (
                        <p className="product_discount">
                            Discount: {product.discountPercentage.toFixed(2)}%
                        </p>
                    )}
                </div>
            </NavLink>
        </li>
    );
};

export default ProductCard;
