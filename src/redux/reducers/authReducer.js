import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from '../../firebase/config'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

let initialState = {
    currentUser: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
}

export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async ({ name, email, password }, thunkAPI) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            let user = userCredentials.user;

            // Add a new document in collection "users"
            await setDoc(doc(db, "users", user.uid), {
                id: user.uid,
                name: name,
                email: user.email,
                cart: [],
                orders: []
            });
        } catch (e) {
            console.log(e.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, thunkAPI) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            let user = userCredentials.user;

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            thunkAPI.dispatch(login({ id: docSnap.id, ...docSnap.data() }))
        } catch (e) {
            console.log(e.message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, thunkAPI) => {
        try {
            await signOut(auth)
            thunkAPI.dispatch(logout())
        } catch (e) {
            console.log(e.message)
        }
    }
)


export const updateUser = createAsyncThunk(
    "auth/updateUser",
    async (user, thunkAPI) => {
        try {
            // Add a new document in collection "users"
            await setDoc(doc(db, "users", user.id), user);
            thunkAPI.dispatch(login(user))
        } catch (e) {
            console.log(e.message)
        }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload
            state.isAuthenticated = true
            state.isLoading = false;
        },
        logout: (state, action) => {
            state.currentUser = null;
            state.isAuthenticated = false;
        },
        setLoading: (state, action) => {
            state.isLoading = !state.isLoading
        },
        setError: (state, action) => {
            state.error = action.payload
            state.isLoading = false;
        }
    }
})

export const { login, logout } = authSlice.actions
export const authReducer = authSlice.reducer;
export const authSelector = (state) => (state.authReducer)