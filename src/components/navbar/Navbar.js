import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { authSelector, logoutUser } from '../../redux/reducers/authReducer';
import { productSelector, renderProducts } from '../../redux/reducers/productReducer';
import { searchProduct } from '../../services/api';

import './navbar.css';

const Navbar = () => {
    const inputRef = useRef();
    const { isAuthenticated } = useSelector(authSelector);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(renderProducts(searchProduct(inputRef.current.value)))
        navigate(`/?query=${inputRef.current.value}`)
        inputRef.current.value = "";
    };

    function handleLogout() {
        dispatch(logoutUser())
        navigate('/login')
    }




    return (
        <>
            {/* Normal Navbar */}
            <nav className='navbar'>
                <div className='navbar_logo_container'>
                    <img src='/online-shopping (1).png' alt="Logo" />
                    <h2 className='poppins-regular'>Swift<span>Shoppers</span></h2>
                </div>
                <form onSubmit={handleSubmit} className="navbar_search_form">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for Products..."
                    />
                </form>
                <ul className='navbar_options poppins-regular'>

                    <li><NavLink to={"/"}><img src="/home (1).png" alt="" />Home</NavLink></li>
                    {isAuthenticated ? (
                        <>
                            <li><NavLink to={"/orders"}><img src="shopping-bag.png" alt="" />Orders</NavLink></li>
                            <li><NavLink to={"/cart"}><img src='/shopping-cart (1).png' />Cart</NavLink></li>
                            <li onClick={handleLogout}><NavLink ><img src='/log-out.png' />Logout</NavLink></li>
                        </>
                    ) : (
                        <li><NavLink to={"/login"}><img src="/import.png" alt="" />Login</NavLink></li>
                    )}
                </ul>
            </nav>

            <Outlet />
        </>
    );
};

export default Navbar;
