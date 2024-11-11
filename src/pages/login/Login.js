import './login.css'; // Import CSS for styling
import React, { useState } from 'react'; // Import React and useState
import { useDispatch, useSelector } from 'react-redux'; // Import hooks from Redux
import { authSelector, loginUser } from '../../redux/reducers/authReducer'; // Import authSelector and loginUser from Redux
import { NavLink, useNavigate } from 'react-router-dom'; // Import routing components
import { toast } from 'react-toastify'; // Import toast for notifications

// Default form data
const defaultData = {
    email: "",
    password: "",
};

const Login = () => {
    const [formData, setFormData] = useState(defaultData); // State to manage form data
    const { users, isError } = useSelector(authSelector); // Retrieve users and error status from Redux
    const navigate = useNavigate(); // Hook to programmatically navigate
    const dispatch = useDispatch(); // Hook to dispatch actions

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        dispatch(loginUser(formData)); // Dispatch login action with form data
        setFormData(defaultData); // Reset form data to defaults

        // Handle error after dispatching
        if (isError) {
            toast.error(isError); // Show error message
            return;
        }

        navigate(-1); // Navigate back after successful login
    };

    return (
        <div className='login_form_container'>
            <form className='login_form' onSubmit={handleSubmit}> {/* Attach handleSubmit to form */}
                <div className='login_form_email_container'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id='email'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <div className='login_form_password_container'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password" // Fixed typo from "passowrd" to "password"
                        id="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>

                <p>
                    New User?
                    <NavLink to={'/signup'} style={{ color: "green" }}> Signup</NavLink>
                </p>

                <div className='login_form_button_container'>
                    <button type="submit">Login</button> {/* Added type="submit" for clarity */}
                </div>
            </form>
        </div>
    );
}

export default Login;
