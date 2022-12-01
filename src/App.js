import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPastes from "./components/AllPastes";
import { database, useAuth } from "./components/Connection";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { setPasteObject } from "./components/PasteSlice";
import PasteTemplate from "./components/PasteTemplate";
import Profile from "./components/Profile";
import Register from "./components/Register";
import { setIsLoggedIn, setNickname, setUserData, setUserObject } from "./components/UserSlice";
import "./styles/Global.css";



function App() {
  // #region UserData
  const auth = getAuth();
  const isLoggedIn = useSelector((state) => state.UserSlice.isLoggedIn);
  const userObject = useSelector((state) => state.UserSlice.userObject);
  const dispatch = useDispatch();
  const email = useSelector((state) => state.UserSlice.email);
  // #endregion

  useEffect(() => {        // Whenever the user logs in our out, we check it and set data accordingly.
                           // Kada se korisnik uloguje/izloguje, postavljamo podatke u zavisnosti.
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsLoggedIn(true));
        localStorage.setItem('codebox_email', user.email);

        const userReference = doc(database, "users", user.email);
        getDoc(userReference).then((documentSnapshot) => { // When page loads, get snapshot of pastes.
          dispatch(setPasteObject(documentSnapshot.get("pastes"))); // Set the pastes parent to pasteObject
        })
      }
      else {
        dispatch(setIsLoggedIn(false));
      }
    })
  }, [])
  const logout = () => {
    signOut(auth);
  }
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
