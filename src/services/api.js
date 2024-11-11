// URL Construction Functions
export const getAllProductsUrl = () => 'https://dummyjson.com/products';

export const searchProduct = (query) => `https://dummyjson.com/products/search?q=${query}`;

export const getProductByCategory = (category) => `https://dummyjson.com/products/category/${category}`;

export const categoriesUrl = () => 'https://dummyjson.com/products/categories';

// Fetch Single Product with Error Handling
export const getSingleProduct = async (id) => {
    try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) {
            throw new Error(`Error fetching product with ID ${id}: ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error); // Log the error for debugging
        throw error; // Rethrow to handle the error in the calling function
    }
};
