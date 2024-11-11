import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { renderProducts } from '../redux/reducers/productReducer';

/**
 * Custom hook to fetch products from a given URL.
 * 
 * @returns {Object} - An object containing setUrl function and fetch state (error and loading).
 */
const useFetch = () => {
    const dispatch = useDispatch();  // Get the dispatch function from Redux
    const [url, setUrl] = useState(''); // URL to fetch products from
    const [error, setError] = useState(null); // State to store any error encountered
    const [isLoading, setIsLoading] = useState(false); // State to indicate loading status

    useEffect(() => {
        // Only proceed if url is provided
        if (url) {
            setIsLoading(true); // Set loading to true before fetching
            dispatch(renderProducts(url))
                .catch(err => setError(err.message)) // Handle any errors that occur
                .finally(() => setIsLoading(false)); // Reset loading state after fetch
        }
    }, [url, dispatch]); // Dependencies: url and dispatch

    return { setUrl, error, isLoading }; // Return setUrl, error and loading states
}

export default useFetch;
