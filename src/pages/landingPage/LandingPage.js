import { useEffect, useState } from 'react'
import Categories from '../../components/categories/Categories'
import Hero from '../../components/hero/Hero'
import './landingpage.css'
import Features from '../../components/features/Features'
import Products from '../../components/products/Products'
import Feedback from '../../components/feedback/Feedback'
import FAQ from '../../components/faq/FAQ.js'
import { useSelector } from 'react-redux'
import { productSelector } from '../../redux/reducers/productReducer'

const LandingPage = () => {
    const { categories } = useSelector(productSelector)
    return (
        <div className='landing_page'>
            <Hero />
            <Categories />
            {categories.slice(0, 5).map((element, index) => (
                <Products key={index} name={element.name} url={element.url} />
            ))}
            <hr />
            <Features />
            <FAQ />
            <div className='feedback_container'>
                <Feedback />
                <img src="/511c801d-9fa9-4664-88a9-67c63e91493f.png" alt="" />
            </div>
        </div>
    )
}

export default LandingPage
