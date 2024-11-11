import ReviewCard from "../reviewCard/ReviewCard";

// Component to display a list of product reviews
const ProductReviews = ({ reviews }) => (
    <div className='product-reviews'>
        <h3 className='heading poppins-medium'>Product Reviews</h3>
        {/* Map through the reviews and render a ReviewCard for each */}
        {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} /> // Use index as a key (consider using unique IDs if available)
        ))}
        <div className='more-reviews'>
            {/* Button to load more reviews */}
            <button>More Reviews</button>
        </div>
    </div>
);

export default ProductReviews;
