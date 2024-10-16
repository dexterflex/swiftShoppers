import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductCard from '../productCard/ProductCard';
import './product.css'

const Products = ({ name, url }) => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`${url}?limit=4`)
            .then(res => res.json())
            .then(parseJson => {
                setProducts(parseJson.products)
            })
        setIsLoading(false)
    }, [])

    return (
        <div className='products_container'>
            <div className='more_products'><button onClick={() => navigate('/search', { state: { url } })}>View More</button></div>
            <div className='products'>
                <div className='products_heading'><h3>{name}</h3></div>
                {
                    products.map((product, index) => (
                        <ProductCard key={product.id} index={index} product={product} />
                    ))
                }
            </div >
        </div>
    )
}

export default Products
