import styled from "@emotion/styled";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreatePaste.css";
import { database } from "./Connection";



export default function CreatePaste() { 

    // #region 
    const kanitFont = 'Kanit, sans-serif';
    const inputProps = {

        style: {
            fontFamily: kanitFont,
            color: '#fff',
        },
        maxLength: 14
    }

    // #endregion
    const auth = getAuth();
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [content, setContent] = useState();
    const [pasteError, setPasteError] = useState();
    const [pasteSuccess, setPasteSuccess] = useState();
    const [link, setLink] = useState();
    const [password, setPassword] = useState();
    const nav = useNavigate();

    const randomPasteName = () => { // Generates a random paste name (maybe switch to v4?)
        const possibilities = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'A', 'Z'];
        var word = "";
        for (let i = 0; i < 12; i++) {
            const randomLetter = possibilities[Math.floor((Math.random() * possibilities.length))];
            word += randomLetter;
        }
        return word;
    }
    const upload = async () => { // Uploads the paste to the database
        setPasteError(false);
        setPasteSuccess(false);
        if (title === "" || content === "" || author === "" || title === null || title === undefined || content === null || content === undefined || author === null || author === undefined) {
            setPasteError(true);
            return;
        }

        let randomID = randomPasteName();


        if (password != undefined && password != "") { // In our database, we have the users and pastes collections.
            // Every user has a map of objects which hold the pastes they've created.
            // The pastes collection contains all pastes of every user.
            await setDoc(doc(database, "users", auth.currentUser.email), { pastes: { [randomID.toString()]: { title: title, content: content, author: author, name: randomID, password: password } } }, { merge: true });
            await setDoc(doc(database, "pastes", randomID.toString()), { title: title, content: content, author: author, name: randomID, password: password }, { merge: true });
        }
        else {
            await setDoc(doc(database, "users", auth.currentUser.email), { pastes: { [randomID.toString()]: { title: title, content: content, author: author, name: randomID } } }, { merge: true });
            await setDoc(doc(database, "pastes", randomID.toString()), { title: title, content: content, author: author, name: randomID }, { merge: true });
        }


        setLink(randomID); 
        setPasteSuccess(true);
        setPasteError(false);

    }




    return (

        <div id='container'>

            <h3 id='header'>Create a new paste</h3>
            <div id='paste-info'>
                <TextField size='small' inputProps={inputProps} InputLabelProps={{ style: { color: 'grey', fontFamily: kanitFont } }} color='warning' required label="Author" onChange={(e) => setAuthor(e.target.value)}></TextField>
                <TextField size='small' inputProps={inputProps} InputLabelProps={{ style: { color: 'grey', fontFamily: kanitFont } }} label="Title" required color='warning' onChange={(e) => setTitle(e.target.value)}></TextField>
                <TextField size='small' inputProps={inputProps} InputLabelProps={{ style: { color: 'grey', fontFamily: kanitFont } }} label="Password" color='warning' type='password' onChange={(e) => setPassword(e.target.value)}></TextField>
                <div id='status'>
                    {pasteError && <Alert severity="warning">Please input all the fields.</Alert>}
                    {pasteSuccess && <>
                        <Button variant='contained' color='success' onClick={() => nav(`/paste/${link}`, { replace: true })}>Open Link</Button>
                    </>}
                </div>



            </div>

            <div id='paste-box-container'>

                <textarea id='paste-box' onChange={(e) => setContent(e.target.value)} value={content}></textarea>
                <Button variant='contained' sx={{ width: '95%', marginTop: '10px' }} color='warning' onClick={() => upload()}>Upload</Button>

            </div>

            <Snackbar open={pasteSuccess} autoHideDuration={3000}>
                <Alert severity="success">Successfully uploaded the paste!</Alert>
            </Snackbar>
        </div>


    )

}
export const TextStyled = styled(TextField)(({ theme }) => ({
    color: '#fff',
}))
