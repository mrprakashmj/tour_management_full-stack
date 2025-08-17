// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "tourvista-pq09q",
  "appId": "1:340971216819:web:e07b22a6c902ceba89b5c6",
  "storageBucket": "tourvista-pq09q.firebasestorage.app",
  "apiKey": "AIzaSyD94wpxXlPUflTLR0mQEGjwJGrN5VU8HDE",
  "authDomain": "tourvista-pq09q.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "340971216819"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
