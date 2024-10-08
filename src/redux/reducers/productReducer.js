import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
    products: [],
    categories: [],
    defaultUrl: "https://dummyjson.com/products?limit=194",
    isLoading: false,
    isError: false
}

export const renderCategories = createAsyncThunk(
    "product/categories",
    async (_, thunkAPI) => {
        try {
            let res = await fetch('https://dummyjson.com/products/categories');
            let jsonRes = await res.json();
            thunkAPI.dispatch(setCategories(jsonRes))
        } catch (e) {
            console.log(e.message)
        }
    }
)


export const renderProducts = createAsyncThunk(
    "product/products",
    async (url, thunkAPI) => {
        try {
            thunkAPI.dispatch(toggleStatus())
            let res = await fetch(url);
            let jsonRes = await res.json();
            thunkAPI.dispatch(setProducts(jsonRes.products))
            thunkAPI.dispatch(toggleStatus())
        } catch (e) {
            console.log(e.message)
        }
    }
)



export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setUrl: (state, action) => {
            state.url = action.payload
        },
        toggleStatus: (state, action) => {
            state.isLoading = !state.isLoading;
        }
    }
})


export const { setCategories, setProducts, setUrl, toggleStatus } = productSlice.actions;
export const productReducer = productSlice.reducer;
export const productSelector = (state) => (state.productReducer)