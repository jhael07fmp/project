import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6fLRADhxDWx0OkGeIrZSL3fTwO2FDjv8",
  authDomain: "tupeluqueria-app.firebaseapp.com",
  projectId: "tupeluqueria-app",
  storageBucket: "tupeluqueria-app.appspot.com",
  messagingSenderId: "486805377467",
  appId: "1:486805377467:web:1135837f09514627abb49e",
  measurementId: "G-RBC1KJ490L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
