import { NavLink } from 'react-router-dom';
import './productcard.css'

const ProductCard = ({ index, product }) => {
    return (
        <li className='product_card' >
            <div className='product_image_container'>
                <img src={product.images[0]} alt={product.title} />
            </div>

            <NavLink to={`/products/${product.id}`}>
                <div className='product_details'>
                    <h3 className='product_title poppins-medium'>{product.title}</h3>
                    <p className='product_brand'>{product.brand}</p>
                    <p className='product_price'>${product.price.toFixed(2)}</p>
                    {product.discountPercentage && (
                        <p className='product_discount'>
                            Discount: {product.discountPercentage.toFixed(2)}%
                        </p>
                    )}
                    <small className='product_rating'>
                        ⭐ {Math.round(product.rating)} ({product.stock} left)
                    </small>
                </div>
            </NavLink>
        </li >
    )
}

export default ProductCard;
