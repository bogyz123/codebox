import { CircularProgress } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Route, Routes } from "react-router-dom";
import AllPastes from "./components/AllPastes";
import { database } from "./components/Connection";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { setPasteObject } from "./components/PasteSlice";
import PasteTemplate from "./components/PasteTemplate";
import Profile from "./components/Profile";
import Register from "./components/Register";
import { setIsLoading, setIsLoggedIn } from "./components/UserSlice";
import "./styles/Global.css";

function App() {
  const auth = getAuth();
  const isLoggedIn = useSelector((state) => state.UserSlice.isLoggedIn);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.UserSlice.isLoading);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => { // When we log in/out.
      if (user) { // If logged
        dispatch(setIsLoggedIn(true));
        localStorage.setItem('codebox_email', user.email);
        const userReference = doc(database, "users", user.email); // Reference to all of our pastes
        getDoc(userReference).then((documentSnapshot) => {
          const pasteObject = documentSnapshot.get("pastes"); // Map that contains all our pastes as objects
          if (!pasteObject) {
            dispatch(setIsLoading(false));
            return;
          }
          const pasteArray = Object.entries(pasteObject).map(([key, value]) => { // Serialize
            return { id: key, ...value };
          });
          dispatch(setPasteObject(pasteArray)); // then store in pasteObject
          dispatch(setIsLoading(false));
        })
      } else { // If we just logged out
        dispatch(setIsLoggedIn(false));
        dispatch(setIsLoading(false));
      }
    });
  }, []);
  return (
    <>
      {isLoading ?
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </div>
        : (
          <HashRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={
                isLoggedIn ? <Homepage /> : <Login />
              } />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='*' element={<div>That page doesn't exist.</div>} />
              <Route path='/user/:userID' element={< Profile />} />
              <Route path='/paste/:pasteID' element={< PasteTemplate />} />
              <Route path='all-pastes' element={<AllPastes />} />
            </Routes>
          </HashRouter>
        )}
    </>
  );
}

export default App;
