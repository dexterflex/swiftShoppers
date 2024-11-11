import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from './redux/reducers/authReducer';

const Protected = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useSelector(authSelector);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, isLoading, navigate]);

    // Only render children if authenticated and not loading
    return isAuthenticated ? children : null;
};

export default Protected;
