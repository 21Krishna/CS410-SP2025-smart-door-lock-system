import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDT_zlhzvjWe6YcxNUGFHzCr4iL6JCgnLQ",
  authDomain: "smartdoorlock-1d821.firebaseapp.com",
  databaseURL: "https://smartdoorlock-1d821-default-rtdb.firebaseio.com/",
  projectId: "smartdoorlock-1d821",
  storageBucket:  "smartdoorlock-1d821.appspot.com",
  messagingSenderId: "692275491045",
  appId: "1:692275491045:web:46aa1445eff1892c5e640c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

