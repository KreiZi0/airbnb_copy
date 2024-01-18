import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Import getDatabase from firebase/database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsvrS9PlwVxaBmX46qRXmlFtdrmDQYplU",
  authDomain: "airbnbcopy-d9e4a.firebaseapp.com",
  projectId: "airbnbcopy-d9e4a",
  storageBucket: "airbnbcopy-d9e4a.appspot.com",
  messagingSenderId: "377975085437",
  appId: "1:377975085437:web:e7b842e09af3dfe5189414",
  databaseURL: "https://airbnbcopy-d9e4a-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); // Use getDatabase instead of getAuth

export { auth, database };
