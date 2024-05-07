// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-a6771.firebaseapp.com",
  projectId: "blog-a6771",
  storageBucket: "blog-a6771.appspot.com",
  messagingSenderId: "549838774360",
  appId: "1:549838774360:web:67a6fce8518655319f6a2d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);