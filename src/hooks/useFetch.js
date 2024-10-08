import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { renderProducts } from '../redux/reducers/productReducer'

const useFetch = () => {
    const dispatch = useDispatch()
    const [url, setUrl] = useState(null)

    useEffect(() => {
        url && dispatch(renderProducts(url))
    }, [url])

    return { setUrl };
}

export default useFetch
