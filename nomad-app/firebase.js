// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8b06J-0ZaHX9kC7W6a-eJ-gwu3oGBKA8",
  authDomain: "nomad-app-e79f9.firebaseapp.com",
  projectId: "nomad-app-e79f9",
  storageBucket: "nomad-app-e79f9.appspot.com",
  messagingSenderId: "463646179309",
  appId: "1:463646179309:web:9a583da4a3cfabf516b1e4",
  measurementId: "G-FHC7N8LCGQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };