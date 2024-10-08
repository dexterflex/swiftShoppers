import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './cart.css'
import { addOrder, authSelector } from '../../redux/reducers/authReducer'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../redux/reducers/authReducer';

const Cart = () => {
    const { currentUser } = useSelector(authSelector)
    const [coupon, setCoupon] = useState('')
    const [discount, setDiscount] = useState(0)
    const deliveryFee = 10.00
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const applyCoupon = (e) => {
        e.preventDefault()
        // Dummy logic for a 10% discount for "SAVE10" coupon
        if (coupon === 'SAVE10') {
            setDiscount(0.1)
            toast.success('Coupon Successfully Applied')
        } else {
            toast.error('Invalid Coupon Code')
            setDiscount(0)
        }
    }

    function proceedCheckout() {
        if (currentUser.cart.length === 0) {
            toast.error("Cart is Empty")
            return;
        }
        let orders = [...currentUser.orders]; // Copy existing orders

        // Add the new order with the product list and amount
        orders.push({
            list: [...currentUser.cart],
            amount: subtotal,
            date: new Date().getTime()
        });

        dispatch(updateUser({ ...currentUser, orders, cart: [] })); // Update the user with the new orders
        navigate('/orders')
    }

    const subtotal = currentUser.cart.reduce((acc, item) => acc + (item.quantity * (100 - item.discountPercentage) * item.price / 100), 0)
    const total = (subtotal - (subtotal * discount) + deliveryFee).toFixed(2)

    return (
        <>
            {
                <div className='cart_container'>
                    {
                        currentUser.cart.length === 0 ?
                            <p className='poppins-medium' style={{ minHeight: "calc(100vh - 70px" }}>No Products in the cart</p> :
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
                                        {
                                            currentUser.cart.map((element, index) => (
                                                <tr key={index}>
                                                    <td className='poppins-regular'><img src={element.images[0]} alt="" /></td>
                                                    <td className='poppins-regular'>{element.title}</td>
                                                    <td className='poppins-regular'>x{element.quantity}</td>
                                                    <td className='poppins-regular'>${(element.quantity * (100 - element.discountPercentage) * element.price / 100).toFixed(2)}</td>
                                                    <td className='poppins-regular'><img src="delete.png" style={{ height: "25px", width: "25px" }} /></td>
                                                </tr>
                                            ))
                                        }
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
                                        <button className='checkout_button' onClick={proceedCheckout}>Proceed to Checkout</button>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            }
            <ToastContainer />
        </>
    )
}

export default Cart
