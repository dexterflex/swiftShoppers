import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Categories from '../../components/categories/Categories'
import Hero from '../../components/hero/Hero'
import { productSelector } from '../../redux/reducers/productReducer'
import './landingpage.css'
import useFetch from '../../hooks/useFetch'
import Features from '../../components/features/Features'
import Products from '../../components/products/Products'

const LandingPage = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(jsonRes => setData(jsonRes));
    }, [])
    return (
        <div className='landing_page'>
            <Hero />
            <Categories />
            <hr />
            {data.slice(0, 5).map((element, index) => (
                <Products key={index} name={element.name} url={element.url} />
            ))}
            <hr />
            <Features />
        </div>
    )
}

export default LandingPage
