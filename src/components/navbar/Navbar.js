import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { authSelector, logoutUser } from '../../redux/reducers/authReducer';
import { productSelector, renderProducts } from '../../redux/reducers/productReducer';
import { searchProduct } from '../../services/api';
import Footer from '../footer/Footer';

import './navbar.css';

const Navbar = () => {
    const inputRef = useRef();
    const { isAuthenticated } = useSelector(authSelector);
    const { products } = useSelector(productSelector)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputRef.current.value.trim() === "") {
            toast.info("Our search engine isn't great at reading minds (yet).")
            return;
        }
        let url = searchProduct(inputRef.current.value)
        navigate('/search', { state: { url } })
        inputRef.current.value = "";
    };

    function handleLogout() {
        dispatch(logoutUser())
        navigate('/login')
    }




    return (
        <>
            <ToastContainer />
            {/* Normal Navbar */}
            <nav className='navbar'>
                <div className='navbar_logo_container'>
                    <img src='/online-shopping (1).png' alt="Logo" />
                    <h2 className='poppins-regular' onClick={() => navigate('/')}>Swift<span>Shoppers</span></h2>
                </div>
                <form onSubmit={handleSubmit} className="navbar_search_form">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for Products..."
                    />
                </form>
                <ul className='navbar_options poppins-regular'>

                    <li><NavLink to={"/"} className={({ isActive }) => (isActive ? 'active' : '')}><img src="/home (1).png" alt="" />Home</NavLink></li>
                    {isAuthenticated ? (
                        <>
                            <li><NavLink to={"/orders"} className={({ isActive }) => (isActive ? 'active' : '')}><img src="shopping-bag.png" alt="" />Orders</NavLink></li>
                            <li><NavLink to={"/cart"} className={({ isActive }) => (isActive ? 'active' : '')}><img src='/shopping-cart (1).png' />Cart</NavLink></li>
                            <li onClick={handleLogout} ><NavLink className={({ isActive }) => ''}><img src='/log-out.png' />Logout</NavLink></li>
                        </>
                    ) : (
                        <li><NavLink to={"/login"} className={({ isActive }) => (isActive ? 'active' : '')}><img src="/import.png" alt="" />Login</NavLink></li>
                    )}
                </ul>
            </nav>

            <Outlet />
            <Footer />
        </>
    );
};

export default Navbar;
