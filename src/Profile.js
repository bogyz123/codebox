import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom"
import { database } from "./Connection";
import "../styles/Profile.css";
import { Container } from "@mui/system";
import { Alert, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setNickname } from "./UserSlice";

export default function Profile() { // Todo...
    const { userID } = useParams();
    const userReference = doc(database, "users", userID);
    const [currentNickname, setCurrentNickname] = useState();
    const [currentEmail, setCurrentEmail] = useState();
    const [existError, setExistError] = useState();
    const [pastes, setPastes] = useState([]);
    useEffect(() => {
        getDoc(userReference).then((userSnapshot) => {
            if (!userSnapshot.exists()) {
                setExistError(true);
                return;
            }
            alert(userSnapshot.get("pastes"));
        })
    }, [])



    return (
        <>{existError ? <Alert severity="error">That user does not exist in our database.</Alert> : <div id='profile-wrapper'>
            <div id='profile-container'>
                <div id='profile-avatar'>
                    <Avatar></Avatar>
                    <div id='profile-name'>{userID}</div>
                </div>
                <div id='paste-list'>
                    <p>Pastes</p>
                    <div id='paste-grid'>

                    </div>
                </div>

            </div>

        </div>}</>




    )
}