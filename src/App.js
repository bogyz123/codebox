
import Homepage from "./components/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RecentPastes, { ShowResults } from "./components/RecentPastes";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { database } from "./components/Connection";
import Paste from "./components/Paste";
import ReactDOM from "react-dom";
import Page404 from "./components/Page404";


function App() {

  useEffect(() => {
    var params = new URLSearchParams(window.location.href);
    if (params.has("paste")) {
      let value = params.get("paste");
      if (value === null || value == "") {
        ReactDOM.render(<Page404 />, document.getElementById("root"));
        return;
      }
      else {
        let fetch = async () => {
          const ref = doc(database, "pastes", value);
          const snap = await getDoc(ref);
          if (snap.get("author") == null || snap.get("author") == "") {
            ReactDOM.render(<Page404 />, document.getElementById("root"));
            return;
          }
          else {
            ReactDOM.render(<Paste title={snap.get("title")} author={snap.get("author")} />, document.getElementById("root"));
          }
        }
        fetch();
      }
    }
  }, [window.location.href])

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Homepage />} />
        </Routes>
      </BrowserRouter>


    </>

    // Problem: Kada searchujemo paste, zelim da redirectujem browser na site.com/ID. ID=ID od pastea u databazi.
    // Kada se URL promeni, gledamo da li ima site.com/id='x', ako ima, trazimo taj ID u databazi getDoc() i ukoliko nije pronadjem, dajemo 404 Page.
    // Ukoliko je pronadjen, pozivamo komponentu novu <Paste/> i dajemo joj prop id=ID OD PASTEA
    // U toj komponenti, uzimamo taj ID i sve informacije o pasteu i pravimo strukturu page-a na te informacije.
    // React-Router se ne moze koristiti ili moze ako se popravi bug sa useNavigate().
  );
}

export default App;
