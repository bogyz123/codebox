import { Alert, Avatar } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Profile.css";
import { database } from "./Connection";

export default function Profile() { // Todo.
    const { userID } = useParams();
    const userReference = doc(database, "users", userID);
    const [existError, setExistError] = useState();
    useEffect(() => {
        getDoc(userReference).then((userSnapshot) => {
            if (!userSnapshot.exists()) {
                setExistError(true);
                return;
            }
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