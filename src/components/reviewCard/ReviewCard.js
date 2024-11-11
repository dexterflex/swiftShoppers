import React from 'react';

// ReviewCard component to display individual product reviews
const ReviewCard = ({ review }) => (
    <div className='review-card'>
        {/* Header section for reviewer information and rating */}
        <div className='review-header'>
            <div className='reviewer-info'>
                <p className='reviewer-name poppins-regular'>{review.reviewerName}</p>
                <small className='review-date'>
                    {new Date(review.date).toLocaleDateString()} {/* Format review date */}
                </small>
            </div>
            <div className='review-rating'>
                <span>{review.rating} / 5</span> {/* Display review rating */}
            </div>
        </div>

        {/* Body section for the review comment */}
        <div className='review-body'>
            <p className='review-comment'>"{review.comment}"</p> {/* Display review comment */}
        </div>
    </div>
);

export default ReviewCard;
