// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZHL84BYIZ3j6gWz3yWf4oNlhqI8dzQvs",
    authDomain: "swiftshoppers-a3df9.firebaseapp.com",
    projectId: "swiftshoppers-a3df9",
    storageBucket: "swiftshoppers-a3df9.appspot.com",
    messagingSenderId: "739534814598",
    appId: "1:739534814598:web:209101d5b237653b18c007"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app)
