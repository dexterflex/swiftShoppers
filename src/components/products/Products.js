import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
        <div className='products'>
            <div className='products_heading'><h3>{name}</h3></div>
            {
                products.map((product, index) => (
                    <div className='product pointer' key={index} onClick={() => navigate(`/products/${product.id}`)}><img src={product.images[0]} alt="product.title" /></div>
                ))
            }
            <div className='product'><h4 className='pointer' onClick={() => navigate('/search', { state: { url } })}>View More</h4></div>
        </div >
    )
}

export default Products
