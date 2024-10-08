import React from 'react'
import { useSelector } from 'react-redux'
import './orders.css'
import { authSelector } from '../../redux/reducers/authReducer'
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const { currentUser } = useSelector(authSelector)
    const navigate = useNavigate()

    let sortedOrders = [...currentUser.orders].sort((a, b) => new Date(b.date) - new Date(a.date));

    const deliveryFee = 10.00

    return (
        <>
            <div className='orders_container'>
                {
                    sortedOrders.length === 0 ? (
                        <p className='poppins-medium' style={{ minHeight: "calc(100vh - 70px" }}>No orders found.</p>
                    ) : (
                        sortedOrders.map((order, orderIndex) => {
                            const subtotal = order.amount;
                            const total = (subtotal + deliveryFee).toFixed(2)
                            return (
                                <div key={orderIndex} className='order'>
                                    <h2>Order #{orderIndex + 1}</h2>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className='poppins-medium'>Image</th>
                                                <th className='poppins-medium'>Title</th>
                                                <th className='poppins-medium'>Quantity</th>
                                                <th className='poppins-medium'>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                order.list.map((product, index) => (
                                                    <tr key={index}>
                                                        <td className='poppins-regular'><img src={product.images[0]} alt={product.title} onClick={() => navigate(`/products/${product.id}`)} /></td>
                                                        <td className='poppins-regular'>{product.title}</td>
                                                        <td className='poppins-regular'>x{product.quantity}</td>
                                                        <td className='poppins-regular'>${(product.quantity * (100 - product.discountPercentage) * product.price / 100).toFixed(2)}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className='order_summary'>
                                        <div className='summary_item'>
                                            <span className='poppins-regular'>Subtotal:</span>
                                            <span className='poppins-regular'>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className='summary_item'>
                                            <span className='poppins-regular'>Delivery Fee:</span>
                                            <span className='poppins-regular'>${deliveryFee.toFixed(2)}</span>
                                        </div>
                                        <div className='summary_item total'>
                                            <span className='poppins-medium'>Total:</span>
                                            <span className='poppins-medium'>${total}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
            <ToastContainer />
        </>
    )
}

export default Orders
