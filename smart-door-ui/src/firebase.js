// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDT_zlhzvjWe6YcxNUGFHzCr4iL6JCgnLQ",
    authDomain: "smartdoorlock-1d821.firebaseapp.com",
    databaseURL: "https://smartdoorlock-1d821-default-rtdb.firebaseio.com/", // ✅ add this line
    projectId: "smartdoorlock-1d821",
    storageBucket: "smartdoorlock-1d821.firebasestorage.app",
    messagingSenderId: "692275491045",
    appId: "1:692275491045:web:46aa1445eff1892c5e640c"
  };
  
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;

