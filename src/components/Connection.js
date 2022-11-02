// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEmail, setIsLoggedIn, setUserObject } from "./UserSlice";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFgQ0JCuBGhr2HB3eZ7womWIy01-sh8aE",
  authDomain: "codebox-54ff6.firebaseapp.com",
  projectId: "codebox-54ff6",
  storageBucket: "codebox-54ff6.appspot.com",
  messagingSenderId: "310676588613",
  appId: "1:310676588613:web:d26a490919f6766d8ebb2c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth();


export const randomName = () => {
  var result = "";
  const possibilities = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '#', '$', '!', '@', '%', '^', '&', '*', '(', ')'];
  for (let i = 0; i < possibilities.length; i++) {
    result += possibilities[(Math.floor(Math.random() * possibilities.length))];
  }
  return result;
}
