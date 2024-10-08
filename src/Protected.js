import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from './redux/reducers/authReducer';

const Protected = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(authSelector);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    // Only render children if authenticated
    return isAuthenticated ? children : null;
};

export default Protected;
