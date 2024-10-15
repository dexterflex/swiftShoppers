import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleProduct } from '../../services/api';
import { ScaleLoader } from 'react-spinners';
import './productdetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, addToCart, authSelector, updateUser } from '../../redux/reducers/authReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated, currentUser } = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProduct = async () => {
            const data = await getSingleProduct(id);
            setProduct(data);
            setIsLoading(false);
        };
        fetchProduct();
    }, [id]);

    const handleCart = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        let cart = [...currentUser.cart]
        let isAvailable = cart.find(c => c.id === product.id);

        if (!isAvailable) {

            cart.push({ ...product, quantity: 1 })
            dispatch(updateUser({ ...currentUser, cart }))
            toast.success("Product added to Cart");
        }
        else {
            toast.success("Already in the Cart")
        }
        // Show success message
    };

    const handleBuy = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        let orders = [...currentUser.orders]; // Copy existing orders
        let amount = ((100 - product.discountPercentage) / 100) * product.price; // Calculate the amount

        // Add the new order with the product list and amount
        orders.push({
            list: [{ ...product, quantity: 1 }],
            amount,
            date: new Date().getTime()
        });

        dispatch(updateUser({ ...currentUser, orders })); // Update the user with the new orders
        navigate('/orders')
    };

    return (

        <div className='product-details-container'>
            {isLoading ? (
                <div className='loading-container'>
                    <ScaleLoader color="green" />
                </div>
            ) : (
                <section className='product-info'>
                    <ProductInfoHeading product={product} onCart={handleCart} onBuy={handleBuy} åå />
                    <ProductInfoBody product={product} />
                </section>
            )}
        </div>

    );
};

const ProductInfoHeading = ({ product, onCart, onBuy }) => (

    <div className='product-info-heading' >
        <img src={product.images[0]} alt={product.title} />
        <div className='button-container'>
            <button className='add-to-cart' onClick={onCart}>
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
            <button className='buy-now' onClick={onBuy}>
                <i className="fa-solid fa-bolt-lightning"></i> Buy Now
            </button>
        </div>
    </div >

);

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
        <h4 className='actual-price'>
            ${product.price}
        </h4>
        <ProductOffers />
        <ProductHighlights product={product} />
        <AdditionalInformation product={product} />
        <ProductReviews reviews={product.reviews} />
    </div>
);

const ProductOffers = () => (
    <div className='product-offers'>
        <h3 className='heading poppins-medium'>Available Offers</h3>
        <OfferText className="poppins-regular" offer="10% off up to ₹749 on HDFC Bank Credit Card Transactions." />
        <OfferText className="poppins-regular" offer="5% Unlimited Cashback on Flipkart Axis Bank Credit Card" />
        <OfferText className="poppins-regular" offer="10% off up to ₹1,250 on HDFC Bank Credit Card Transactions. Min Txn Value: ₹7,499" />
        <OfferText className="poppins-regular" offer="Get extra 33% off (price inclusive of cashback/coupon)" />
    </div>
);

const OfferText = ({ offer }) => (
    <p className='offer poppins-regular'><strong>Bank Offer :</strong> {offer}</p>
);

const ProductHighlights = ({ product }) => (
    <div className='product-highlights'>
        <h3 className='heading poppins-medium'>Product Highlights</h3>
        <HighlightText className="poppins-regular" label="Brand" text={product.brand} />
        <HighlightText className="poppins-regular" label="Weight" text={`${product.weight} lbs`} />
        <HighlightText className="poppins-regular" label="Dimensions" text={`${product.dimensions.width} (Width) * ${product.dimensions.height} (Height) * ${product.dimensions.depth} (Depth)`} />
        <HighlightText className="poppins-regular" label="Warranty" text={product.warrantyInformation} />
    </div>
);

const HighlightText = ({ label, text }) => (
    <p className='highlights poppins-regular'><strong>{label} :</strong> {text}</p>
);

const AdditionalInformation = ({ product }) => (
    <div className='additional-informations'>
        <h3 className='heading poppins-medium'>Additional Information</h3>
        <InformationText label="Shipping" text={product.shippingInformation} />
        <InformationText label="Return Policy" text={product.returnPolicy} />
    </div>
);

const InformationText = ({ label, text }) => (
    <p className='information poppins-regular'><strong>{label} :</strong> {text}</p>
);

const ProductReviews = ({ reviews }) => (
    <div className='product-reviews'>
        <h3 className='heading poppins-medium'>Product Reviews</h3>
        {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
        ))}
        <div className='more-reviews'>
            <button>More Reviews</button>
        </div>
    </div>
);

const ReviewCard = ({ review }) => (
    <div className='review-card'>
        <div className='review-header'>
            <div className='reviewer-info'>
                <p className='reviewer-name poppins-regular'>{review.reviewerName}</p>
                <small className='review-date'>{new Date(review.date).toLocaleDateString()}</small>
            </div>
            <div className='review-rating'>
                <span>{review.rating} / 5</span>
            </div>
        </div>
        <div className='review-body'>
            <p className='review-comment'>"{review.comment}"</p>
        </div>
    </div>
);

export default ProductDetails;
