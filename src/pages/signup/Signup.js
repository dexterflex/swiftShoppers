import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addUser, authSelector, signupUser } from '../../redux/reducers/authReducer';

import './signup.css'

const defaultData = {
    name: "",
    email: "",
    password: ""
}



const Signup = () => {
    const [formData, setFormData] = useState(defaultData)
    const dispatch = useDispatch();
    const { users } = useSelector(authSelector)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(signupUser(formData))
        setFormData(defaultData)
        navigate('/login')
    }

    return (
        <>
            <ToastContainer />
            <div className='signup_form_container' onSubmit={handleSubmit}>
                <form className='signup_form'>

                    <div className='signup_form_email_container'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>

                    <div className='signup_form_email_container'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>

                    <div className='signup_form_password_container'>
                        <label htmlFor="password">Password</label>
                        <input type="passowrd" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <p>Already Registerd?<NavLink to={'/login'} style={{ color: "green" }}> Login</NavLink></p>
                    <div className='signup_form_button_container'>
                        <button>Signup</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup
