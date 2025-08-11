// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQjXBlJn4fA25XXH1QPj7kbhNWyUm1ppY",
  authDomain: "uberclone-7a761.firebaseapp.com",
  projectId: "uberclone-7a761",
  storageBucket: "uberclone-7a761.firebasestorage.app",
  messagingSenderId: "935120932114",
  appId: "1:935120932114:web:43f5795fae28d9320277cb",
  measurementId: "G-N7QEJ5M79S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Auth instance
export const auth = getAuth(app);