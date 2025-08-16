// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_AUTH_API,
  authDomain: "artgallery-5ec14.firebaseapp.com",
  projectId: "artgallery-5ec14",
  storageBucket: "artgallery-5ec14.firebasestorage.app",
  messagingSenderId: "306089420008",
  appId: "1:306089420008:web:ce98a94f37b37680d1d55d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);