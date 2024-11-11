import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authSelector, logoutUser } from '../../redux/reducers/authReducer';
import { searchProduct } from '../../services/api';
import Footer from '../footer/Footer';
import './navbar.css';

const Navbar = () => {
    const inputRef = useRef(); // Reference for the search input
    const { isAuthenticated } = useSelector(authSelector); // Selector to check authentication status
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle form submission for search
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (inputRef.current.value.trim() === "") {
            toast.info("Our search engine isn't great at reading minds (yet).");
            return; // Show toast if input is empty
        }
        const url = searchProduct(inputRef.current.value); // Get search URL
        navigate('/search', { state: { url } }); // Navigate to search results
        inputRef.current.value = ""; // Clear the input field
    };

    // Handle user logout
    const handleLogout = () => {
        dispatch(logoutUser()); // Dispatch logout action
        navigate('/login'); // Navigate to login page
    };

    return (
        <>
            {/* Navigation Bar */}
            <nav className='navbar'>
                {/* Logo and Brand Name */}
                <div className='navbar_logo_container' onClick={() => navigate('/')}>
                    <img src='/online-shopping (1).png' alt="Logo" />
                    <h2 className='poppins-regular'>Swift<span>Shoppers</span></h2>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSubmit} className="navbar_search_form">
                    <input
                        ref={inputRef} // Attach ref for the input
                        type="text"
                        placeholder="Search for Products..."
                    />
                </form>

                {/* Navigation Options */}
                <ul className='navbar_options poppins-regular'>
                    <li>
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
                            <img src="/home (1).png" alt="Home" />Home
                        </NavLink>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <NavLink to="/orders" className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <img src="shopping-bag.png" alt="Orders" />Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
                                    <img src='/shopping-cart (1).png' alt="Cart" />Cart
                                </NavLink>
                            </li>
                            <li onClick={handleLogout}>
                                <NavLink className={({ isActive }) => ''}>
                                    <img src='/log-out.png' alt="Logout" />Logout
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <li>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                                <img src="/import.png" alt="Login" />Login
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>

            <Outlet /> {/* Render nested routes */}
            <Footer /> {/* Footer component */}
        </>
    );
};

export default Navbar;
