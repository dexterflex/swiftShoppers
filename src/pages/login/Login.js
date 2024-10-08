import './login.css'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, login, loginUser } from '../../redux/reducers/authReducer'
import { NavLink, useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const defaultData = {
    email: "",
    password: ""
}

const Login = () => {
    const [formData, setFormData] = useState(defaultData)
    const { users } = useSelector(authSelector)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    function handleSubmit(e) {
        e.preventDefault()
        dispatch(loginUser(formData))
        setFormData(defaultData)
        navigate(-1)
    }
    return (
        <>
            <ToastContainer />
            <div className='login_form_container' onSubmit={handleSubmit}>
                <form className='login_form'>

                    <div className='login_form_email_container'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>

                    <div className='login_form_password_container'>
                        <label htmlFor="password">Password</label>
                        <input type="passowrd" id="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                    </div>
                    <p>New User?<NavLink to={'/signup'} style={{ color: "green" }}> Signup</NavLink></p>
                    <div className='login_form_button_container'>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
