import { useSelector } from 'react-redux'; // Import useSelector from Redux
import Categories from '../../components/categories/Categories'; // Import Categories component
import Hero from '../../components/hero/Hero'; // Import Hero component
import './landingpage.css'; // Import CSS for styling
import Features from '../../components/features/Features'; // Import Features component
import Products from '../../components/products/Products'; // Import Products component
import Feedback from '../../components/feedback/Feedback'; // Import Feedback component
import FAQ from '../../components/faq/FAQ.js'; // Import FAQ component
import { productSelector } from '../../redux/reducers/productReducer'; // Import productSelector from Redux

const LandingPage = () => {
    // Get categories from Redux store
    const { categories } = useSelector(productSelector);

    return (
        <div className='landing_page'>
            {/* Render Hero component */}
            <Hero />

            {/* Render Categories component */}
            <Categories />

            {/* Render Products for the first five categories */}
            {categories.slice(0, 5).map((element, index) => (
                <Products key={index} name={element.name} url={element.url} />
            ))}

            <hr />

            {/* Render Features and FAQ components */}
            <Features />
            <FAQ />

            {/* Feedback section with image */}
            <div className='feedback_container'>
                <Feedback />
                <img
                    src="/511c801d-9fa9-4664-88a9-67c63e91493f.png"
                    alt="Feedback"
                />
            </div>
        </div>
    );
}

export default LandingPage;
