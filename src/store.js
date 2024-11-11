import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./redux/reducers/authReducer";
import { productReducer } from './redux/reducers/productReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,  // Consider renaming the keys for clarity
        product: productReducer
    },
    // Optional: Add middleware or customize if needed
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable if you use non-serializable values in state
        }),
    devTools: process.env.NODE_ENV !== 'production', // DevTools enabled only in development
});
