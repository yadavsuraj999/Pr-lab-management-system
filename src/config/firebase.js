import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlV-pgCE27O3RT7yZK587fmonoHRNxAsY",
  authDomain: "lab-management-system-195d0.firebaseapp.com",
  projectId: "lab-management-system-195d0",
  storageBucket: "lab-management-system-195d0.firebasestorage.app",
  messagingSenderId: "732273631774",
  appId: "1:732273631774:web:a5db9f011e7c2e7ffcc40f"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)