import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { productSelector, renderCategories } from '../../redux/reducers/productReducer';
import './categories.css';

const Categories = () => {
    // Retrieve categories from Redux state
    const { categories } = useSelector(productSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch and render categories when component mounts
    useEffect(() => {
        if (categories) {
            dispatch(renderCategories());
        }
    }, [categories, dispatch]);

    // Navigate to the search page when a category is clicked
    const clickHandler = (url) => {
        navigate('/search', { state: { url } });
    };

    return (
        <div className='categories_container'>
            {/* Check if categories exist and are loaded */}
            {
                categories && categories.length > 0 ? (
                    categories.map((element, index) => (
                        <button
                            key={index}
                            onClick={() => clickHandler(element.url)}
                        >
                            {element.name}
                        </button>
                    ))
                ) : (
                    <p>Loading categories...</p> // Display loading message if categories are not available
                )
            }
        </div>
    );
};

export default Categories;
