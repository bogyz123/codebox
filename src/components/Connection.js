import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLIuH5pHBvkXg8se9AvvX_agbIHVYc6zw",
  authDomain: "codebox-dbcad.firebaseapp.com",
  projectId: "codebox-dbcad",
  storageBucket: "codebox-dbcad.appspot.com",
  messagingSenderId: "20546660708",
  appId: "1:20546660708:web:b0e256887bb21f5e56f271",
  measurementId: "G-WTZ7VRVZ39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)