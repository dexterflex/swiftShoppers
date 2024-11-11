import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { signupUser } from '../../redux/reducers/authReducer';
import './signup.css';

const defaultData = {
    name: "",
    email: "",
    password: ""
};

const Signup = () => {
    const [formData, setFormData] = useState(defaultData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        dispatch(signupUser(formData)); // Dispatch signup action with form data
        setFormData(defaultData); // Reset form data
        navigate('/login'); // Redirect to login page
    };

    return (
        <div className='signup_form_container'>
            <form className='signup_form' onSubmit={handleSubmit}> {/* Moved onSubmit here for correct behavior */}
                <div className='signup_form_email_container'>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id='name'
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required // Added required attribute
                    />
                </div>

                <div className='signup_form_email_container'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id='email'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required // Added required attribute
                    />
                </div>

                <div className='signup_form_password_container'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password" // Fixed typo from 'passowrd' to 'password'
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required // Added required attribute
                    />
                </div>

                <p>
                    Already Registered?
                    <NavLink to='/login' style={{ color: "green" }}> Login</NavLink>
                </p>
                <div className='signup_form_button_container'>
                    <button type="submit">Signup</button> {/* Added type="submit" for clarity */}
                </div>
            </form>
        </div>
    );
};

export default Signup;
