import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { productSelector, renderCategories } from '../../redux/reducers/productReducer'
import './categories.css'

const Categories = () => {
    const { categories } = useSelector(productSelector)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (categories) {
            dispatch(renderCategories())
        }
    }, [])

    function clickHandler(url) {
        navigate('/search', { state: { url } })
    }
    return (
        <div className='categories_container'>
            {
                categories && categories.length > 0 ? (
                    categories.map((element, index) => (
                        <button key={index} onClick={() => clickHandler(element.url)}>{element.name}</button>
                    ))
                ) : (
                    <p>Loading categories...</p>
                )
            }
        </div>
    )
}

export default Categories
