
import Homepage from "./components/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RecentPastes, { ShowResults } from "./components/RecentPastes";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { database } from "./components/Connection";
import Paste from "./components/Paste";
import ReactDOM from "react-dom";
import Page404 from "./components/Page404";
import PasswordScreen from "./components/PasswordScreen";


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
          let pw = snap.get("password");

          if (snap.get("author") == null || snap.get("author") == "") {
            ReactDOM.render(<Page404 />, document.getElementById("root"));
            return;
          }

          if (pw == "" || pw === undefined) {
            ReactDOM.render(<Paste title={snap.get("title")} author={snap.get("author")} />, document.getElementById("root"));
          }
          else {
            ReactDOM.render(<PasswordScreen docID={value} />, document.getElementById("root"));
          }



        }
        fetch();
      }
    }
  }, [window.location.href])

  return (
    <>
    

        <Homepage/>


    </>

   
  );
}

export default App;
