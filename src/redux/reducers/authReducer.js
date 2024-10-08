import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from '../../firebase/config'
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";


// intial state 
let initialState = {
    token: null,
    currentUser: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
}

// Adds new User 
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

// authenticate user 
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, thunkAPI) => {
        try {
            // Proceed to sign in
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
            thunkAPI.dispatch(setError("Wrong Credentials"))
        }
    }
);

// fetch the user and set the state 
export const makeUserPersistence = createAsyncThunk(
    "auth/persistenceUser",
    async ({ token }, thunkAPI) => {
        try {
            let user = token;

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            // Dispatch the login action to update Redux store
            thunkAPI.dispatch(login({ id: user.uid, ...docSnap.data() }));

        } catch (e) {
            console.log(e.message);
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

// logout user 
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

// update user data 
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



// authentication slice 
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

// export of reducer, actions and selector 
export const { login, logout, setError } = authSlice.actions
export const authReducer = authSlice.reducer;
export const authSelector = (state) => (state.authReducer)