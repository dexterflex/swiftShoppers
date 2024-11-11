import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './cart.css';
import { authSelector, updateUser } from '../../redux/reducers/authReducer';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { currentUser } = useSelector(authSelector); // Get current user from Redux
    const [coupon, setCoupon] = useState(''); // State for coupon code
    const [discount, setDiscount] = useState(0); // State for discount percentage
    const deliveryFee = 10.00; // Fixed delivery fee
    const dispatch = useDispatch(); // Redux dispatch function
    const navigate = useNavigate(); // React Router navigate function

    /**
     * Apply coupon code to the cart
     * @param {Event} e - Form submit event
     */
    const applyCoupon = (e) => {
        e.preventDefault();
        if (coupon === 'SAVE10') {
            setDiscount(0.1); // Set discount to 10%
            toast.success('Coupon Successfully Applied');
        } else {
            toast.error('Invalid Coupon Code');
            setDiscount(0); // Reset discount
        }
    };

    /**
     * Proceed to checkout, updating user's orders and cart
     */
    const proceedCheckout = () => {
        if (currentUser.cart.length === 0) {
            toast.error("Cart is Empty");
            return;
        }

        const orders = [...currentUser.orders, {
            list: [...currentUser.cart],
            amount: subtotal,
            date: new Date().getTime(),
        }];

        // Update user in Redux with new orders and clear cart
        dispatch(updateUser({ ...currentUser, orders, cart: [] }));
        navigate('/orders'); // Navigate to orders page
    };

    /**
     * Delete an item from the cart by ID
     * @param {string} id - Product ID to delete
     */
    const deleteElement = (id) => {
        const updatedCart = currentUser.cart.filter(item => item.id !== id);
        dispatch(updateUser({ ...currentUser, cart: updatedCart }));
    };

    /**
     * Update the quantity of a product in the cart
     * @param {string} id - Product ID
     * @param {number} delta - Change in quantity (can be positive or negative)
     */
    const handleQuantityChange = (id, delta) => {
        const updatedCart = currentUser.cart.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) }; // Ensure quantity doesn't drop below 1
            }
            return item;
        });
        dispatch(updateUser({ ...currentUser, cart: updatedCart }));
    };

    // Calculate subtotal, total, and apply discounts
    const subtotal = currentUser.cart.reduce((acc, item) =>
        acc + (item.quantity * (100 - item.discountPercentage) * item.price / 100), 0);
    const total = (subtotal - (subtotal * discount) + deliveryFee).toFixed(2);

    return (
        <div className='cart_container'>
            {currentUser.cart.length === 0 ? (
                <p className='poppins-medium' style={{ minHeight: "calc(100vh - 70px)" }}>
                    No Products in the cart
                </p>
            ) : (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th className='poppins-medium'>Image</th>
                                <th className='poppins-medium'>Title</th>
                                <th className='poppins-medium'>Quantity</th>
                                <th className='poppins-medium'>Price</th>
                                <th className='poppins-medium'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUser.cart.map((element, index) => (
                                <tr key={index}>
                                    <td className='poppins-regular'>
                                        <img
                                            onClick={() => navigate(`/products/${element.id}`)}
                                            src={element.images[0]}
                                            alt={element.title}
                                        />
                                    </td>
                                    <td className='poppins-regular'>{element.title}</td>
                                    <td className='poppins-regular'>
                                        <i
                                            className="fa-solid fa-circle-minus"
                                            onClick={() => handleQuantityChange(element.id, -1)}
                                            style={{ marginRight: "10px" }}
                                        />
                                        {element.quantity}
                                        <i
                                            className="fa-solid fa-circle-plus"
                                            onClick={() => handleQuantityChange(element.id, 1)}
                                            style={{ marginLeft: "10px" }}
                                        />
                                    </td>
                                    <td className='poppins-regular'>
                                        ${(element.quantity * (100 - element.discountPercentage) * element.price / 100).toFixed(2)}
                                    </td>
                                    <td className='poppins-regular'>
                                        <img
                                            src="delete.png"
                                            style={{ height: "25px", width: "25px" }}
                                            onClick={() => deleteElement(element.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Coupon and Summary Section */}
                    <div className='cart_bottom_section'>
                        {/* Coupon Section */}
                        <div className='coupon_section'>
                            <h3>Apply Coupon</h3>
                            <form onSubmit={applyCoupon}>
                                <input
                                    type="text"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    placeholder="Enter Coupon Code"
                                    className='coupon_input poppins-regular'
                                />
                                <button type="submit" className='apply_coupon_button'>Apply</button>
                            </form>
                        </div>

                        {/* Total and Checkout Section */}
                        <div className='total_section'>
                            <h3>Order Summary</h3>
                            <div className='summary_item'>
                                <span className='poppins-regular'>Subtotal:</span>
                                <span className='poppins-regular'>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className='summary_item'>
                                <span className='poppins-regular'>Discount:</span>
                                <span className='poppins-regular'>-${(subtotal * discount).toFixed(2)}</span>
                            </div>
                            <div className='summary_item'>
                                <span className='poppins-regular'>Delivery Fee:</span>
                                <span className='poppins-regular'>${deliveryFee.toFixed(2)}</span>
                            </div>
                            <div className='summary_item total'>
                                <span className='poppins-medium'>Total:</span>
                                <span className='poppins-medium'>${total}</span>
                            </div>
                            <button className='checkout_button' onClick={proceedCheckout}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
