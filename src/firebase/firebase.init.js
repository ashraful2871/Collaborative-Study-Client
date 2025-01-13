// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4rlGrtI0NGCHso6iyvAWdavQwYj0jgJs",
  authDomain: "collaborative-study-platform.firebaseapp.com",
  projectId: "collaborative-study-platform",
  storageBucket: "collaborative-study-platform.firebasestorage.app",
  messagingSenderId: "287990554515",
  appId: "1:287990554515:web:9ae9678135867ce5149266",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
