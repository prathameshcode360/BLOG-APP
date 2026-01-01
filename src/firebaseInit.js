// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCURoUPZZj0Z1z0mjfF1t7pefNnkBXRGro",
  authDomain: "blog-app-8cbfe.firebaseapp.com",
  projectId: "blog-app-8cbfe",
  storageBucket: "blog-app-8cbfe.firebasestorage.app",
  messagingSenderId: "635743543240",
  appId: "1:635743543240:web:944897362386f3f8fbaafd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
