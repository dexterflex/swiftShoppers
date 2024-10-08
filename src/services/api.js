export const getAllProductsUrl = () => {
    return 'https://dummyjson.com/products';
}
export const searchProduct = (query) => {
    return `https://dummyjson.com/products/search?q=${query}`
}
export const getProductByCategory = (category) => {
    return `https://dummyjson.com/products/category/${category}`
}
export const categoriesUrl = () => {
    return 'https://dummyjson.com/products/categories'

};

export const getSingleProduct = async (id) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await res.json();
    return data;
}


