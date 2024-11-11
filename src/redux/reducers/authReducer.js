import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from '../../firebase/config';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Initial state 
const initialState = {
    token: null,
    currentUser: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
};

// Adds new User 
export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async ({ name, email, password }, thunkAPI) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            // Add a new document in collection "users"
            await setDoc(doc(db, "users", user.uid), {
                id: user.uid,
                name: name,
                email: user.email,
                cart: [],
                orders: []
            });

            return { id: user.uid, name, email: user.email, cart: [], orders: [] }; // Return the new user data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message); // Reject with error message
        }
    }
);

// Authenticate user 
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, thunkAPI) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            return { id: user.uid, ...docSnap.data() }; // Return user data
        } catch (e) {
            return thunkAPI.rejectWithValue("Wrong Credentials"); // Reject with error message
        }
    }
);

// Fetch the user and set the state 
export const makeUserPersistence = createAsyncThunk(
    "auth/persistenceUser",
    async (token, thunkAPI) => {
        try {
            const docRef = doc(db, "users", token.uid);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                return thunkAPI.rejectWithValue("User not found"); // Handle case where user doesn't exist
            }

            return { id: token.uid, ...docSnap.data() }; // Return user data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message); // Reject with error message
        }
    }
);

// Logout user 
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, thunkAPI) => {
        try {
            await signOut(auth);
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message); // Reject with error message
        }
    }
);

// Update user data 
export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (user, thunkAPI) => {
        try {
            await setDoc(doc(db, "users", user.id), user);
            return user; // Return updated user data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message); // Reject with error message
        }
    }
);

// Authentication slice 
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null; // Clear any previous errors on login
        },
        logout: (state) => {
            state.currentUser = null;
            state.isAuthenticated = false;
            state.error = null; // Clear any previous errors on logout
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload; // Allow setting loading state explicitly
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.fulfilled, (state, action) => {
                state.currentUser = action.payload; // Set user on successful signup
                state.isAuthenticated = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.error = action.payload; // Set error on failed signup
                state.isLoading = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.currentUser = action.payload; // Set user on successful login
                state.isAuthenticated = true;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload; // Set error on failed login
                state.isLoading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.currentUser = null; // Clear user on successful logout
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload; // Set error on failed logout
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.currentUser = action.payload; // Update user data on successful update
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.payload; // Set error on failed update
            });
    }
});

// Export of reducer, actions, and selector 
export const { login, logout, setError, setLoading } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const authSelector = (state) => state.auth;
