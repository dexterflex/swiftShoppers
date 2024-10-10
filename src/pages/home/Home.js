import './home.css'

import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/productCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { productSelector, renderCategories } from '../../redux/reducers/productReducer';
import { ScaleLoader } from 'react-spinners';
import useFetch from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom';


const Home = () => {
    const { products, isLoading } = useSelector(productSelector)
    console.log(products)
    const [maxPrice, setMaxPrice] = useState(100000);
    const { setUrl } = useFetch()
    const { state } = useLocation()

    useEffect(() => {
        if (state) {
            setUrl(state.url)
            setMaxPrice(100000)
        }
    }, [state])






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

            </div>

            {isLoading ?
                <div className='loader_container'>
                    <ScaleLoader color="green" />
                </div> :

                <div className="home_products_section">
                    {
                        filteredProducts.length === 0 ?
                            <p className='poppins-regular'>No Product Found...</p> :
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
