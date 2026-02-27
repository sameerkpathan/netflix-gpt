// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "netflixgpt-ac379.firebaseapp.com",
  projectId: "netflixgpt-ac379",
  storageBucket: "netflixgpt-ac379.firebasestorage.app",
  messagingSenderId: "853435378282",
  appId: "1:853435378282:web:84f47ed2d1f13143e3b813",
  measurementId: "G-2G6C9NFNW5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const auth = getAuth();
