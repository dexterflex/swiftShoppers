import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
    products: [],
    categories: [],
    defaultUrl: "https://dummyjson.com/products?limit=194",
    isLoading: false,
    isError: false,
    errorMessage: null, // To store error messages
};

export const renderCategories = createAsyncThunk(
    "product/categories",
    async (_, thunkAPI) => {
        try {
            const res = await fetch('https://dummyjson.com/products/categories');
            if (!res.ok) {
                throw new Error('Failed to fetch categories'); // Handle HTTP errors
            }
            const jsonRes = await res.json();
            thunkAPI.dispatch(setCategories(jsonRes));
        } catch (error) {
            thunkAPI.dispatch(setError(error.message)); // Dispatch error action
        }
    }
);

export const renderProducts = createAsyncThunk(
    "product/products",
    async (url = initialState.defaultUrl, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true)); // Set loading state to true
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error('Failed to fetch products'); // Handle HTTP errors
            }
            const jsonRes = await res.json();
            thunkAPI.dispatch(setProducts(jsonRes.products));
        } catch (error) {
            thunkAPI.dispatch(setError(error.message)); // Dispatch error action
        } finally {
            thunkAPI.dispatch(setLoading(false)); // Set loading state to false in finally block
        }
    }
);

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setUrl: (state, action) => {
            state.defaultUrl = action.payload; // Fixed to update defaultUrl
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload; // Explicitly set loading state
        },
        setError: (state, action) => {
            state.isError = true; // Set error state to true
            state.errorMessage = action.payload; // Store error message
        },
        clearError: (state) => {
            state.isError = false; // Reset error state
            state.errorMessage = null; // Clear error message
        },
    },
});

// Export actions and reducer
export const { setCategories, setProducts, setUrl, setLoading, setError, clearError } = productSlice.actions;
export const productReducer = productSlice.reducer;
export const productSelector = (state) => state.product;
