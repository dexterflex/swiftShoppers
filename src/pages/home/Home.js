import './home.css'

import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { productSelector, renderCategories } from '../../redux/reducers/productReducer';
import { ScaleLoader } from 'react-spinners';
import useFetch from '../../hooks/useFetch'
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { searchProduct } from '../../services/api';

const Home = () => {
    const { products, categories, defaultUrl, isLoading } = useSelector(productSelector)
    const [maxPrice, setMaxPrice] = useState(100000);
    const { setUrl } = useFetch()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    const myParam = searchParams.get('query');

    useEffect(() => {
        setUrl(defaultUrl)
        dispatch(renderCategories())
    }, [])

    useEffect(() => {
        if (myParam) {
            setUrl(searchProduct(myParam))
        }
    }, [myParam])




    // Filter products based on the max price
    const filteredProducts = products.filter(product => product.price <= maxPrice);

    return (
        <div className='home'>
            <div className='home_filters'>
                <div className='price_range_filter'>
                    <h4>Price Range</h4>
                    <input
                        type='range'
                        min='0'
                        max='100000'
                        step='1'
                        value={maxPrice} // Bind the value to state
                        className='price_range'
                        onChange={(e) => setMaxPrice(e.target.value)} // Update state on change
                    />
                    <div className='price_range_labels'>
                        <span>$0</span>
                        <span>${maxPrice}</span> {/* Display the current selected max price */}
                    </div>
                </div>

                <div className='category_filter'>
                    <h4>Category</h4>
                    <div className='category_options'>
                        <label className='poppins-extralight'>
                            <input type='radio' name='category' value='all' defaultChecked onClick={() => setUrl(defaultUrl)} />
                            All Categories
                        </label>
                        {categories.map((category, index) => (
                            <label key={index} className='poppins-extralight'>
                                <input type='radio' name='category' value={category.slug} onClick={() => setUrl(category.url)} />
                                {category.name}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {isLoading ?
                <div className='loader_container'>
                    <ScaleLoader color="green" />
                </div> :
                <div className="home_products_section">
                    {
                        filteredProducts.map((product, index) => (
                            <ProductCard key={index} index={index} product={product} />
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Home
