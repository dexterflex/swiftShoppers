import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct } from '../../services/api';
import { ScaleLoader } from 'react-spinners';
import './productdetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, updateUser } from '../../redux/reducers/authReducer';
import { toast } from 'react-toastify';

import ProductReviews from '../../components/productReview/ProductReviews';
import AdditionalInformation from '../../components/additionalInfo/AdditionalInformation';
import ProductHighlights from '../../components/productHighilghts/ProductHighlights';

const ProductDetails = () => {
    const { id } = useParams(); // Get product ID from URL parameters
    const [product, setProduct] = useState({}); // State to store product details
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const { isAuthenticated, currentUser } = useSelector(authSelector); // Auth state from Redux
    const navigate = useNavigate(); // Navigation hook
    const dispatch = useDispatch(); // Dispatch hook

    // Fetch product details when component mounts
    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getSingleProduct(id);
            setProduct(data);
            setIsLoading(false);
        };
        fetchProduct();
    }, [id]);

    // Handle adding product to cart
    const handleCart = () => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
            return;
        }

        const cart = [...currentUser.cart]; // Copy existing cart
        const isAvailable = cart.find(c => c.id === product.id); // Check if product is already in cart

        if (!isAvailable) {
            cart.push({ ...product, quantity: 1 }); // Add product to cart
            dispatch(updateUser({ ...currentUser, cart })); // Update Redux store
            toast.success("Product added to Cart"); // Show success message
        } else {
            toast.success("Already in the Cart"); // Notify if product is already in cart
        }
    };

    // Handle buying product
    const handleBuy = () => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
            return;
        }

        const orders = [...currentUser.orders]; // Copy existing orders
        const amount = ((100 - product.discountPercentage) / 100) * product.price; // Calculate amount

        // Add the new order
        orders.push({
            list: [{ ...product, quantity: 1 }],
            amount,
            date: new Date().getTime(),
        });

        dispatch(updateUser({ ...currentUser, orders })); // Update user with new orders
        navigate('/orders'); // Redirect to orders page
    };

    return (
        <div className='product-details-container'>
            {isLoading ? (
                <div className='loading-container'>
                    <ScaleLoader color="green" /> {/* Loader while fetching data */}
                </div>
            ) : (
                <section className='product-info'>
                    <ProductInfoHeading product={product} onCart={handleCart} onBuy={handleBuy} />
                    <ProductInfoBody product={product} />
                </section>
            )}
        </div>
    );
};

// Component to render product heading with buttons
const ProductInfoHeading = ({ product, onCart, onBuy }) => (
    <div className='product-info-heading'>
        <img src={product.images[0]} alt={product.title} />
        <div className='button-container'>
            <button className='add-to-cart' onClick={onCart}>
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
            <button className='buy-now' onClick={onBuy}>
                <i className="fa-solid fa-bolt-lightning"></i> Buy Now
            </button>
        </div>
    </div>
);

// Component to render main product information
const ProductInfoBody = ({ product }) => (
    <div className='product-info-body'>
        <p className={product.availabilityStatus === "In Stock" ? "status-instock" : "status-outofstock"}>
            {product.availabilityStatus}
        </p>
        <h3 className="title poppins-medium">{product.title}</h3>
        <span>
            <small className='rating'>{product.rating.toFixed(1)} <i className="fa-solid fa-star"></i></small>
            &nbsp;
            <small className="rating-count">{"23,473 Ratings & 1,671 Reviews"}</small>
            <p className='brand'>{product.brand}</p>
        </span>
        <p className='description poppins-light'>{product.description}</p>
        <p className='price'>${((100 - product.discountPercentage) * product.price / 100).toFixed(2)}</p>
        <p className='special-price'>Special Price</p>
        <h4 className='actual-price'>${product.price}</h4>
        <ProductHighlights product={product} />
        <AdditionalInformation product={product} />
        <ProductReviews reviews={product.reviews} />
    </div>
);

export default ProductDetails;
