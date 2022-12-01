import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, snapshotEqual, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { database } from "./Connection";
import "../styles/PasteTemplate.css";
import { Alert, Button, Input, Paper, Snackbar, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { TextStyled } from "./CreatePaste";
import { TableText } from "./AllPastes";
import PasteTable from "./PasteTable";
import styled from "@emotion/styled";
import { Container } from "@mui/system";
import { Send } from "@mui/icons-material";

export default function PasteTemplate() {
    const [docExists, setDocExists] = useState(true);
    const [data, setData] = useState({});
    const [password, setPassword] = useState("x");
    const [enteredPassword, setEnteredPassword] = useState();
    const [error, setError] = useState(false);
    const { pasteID } = useParams();


    useEffect(() => {
        getDoc(doc(database, "pastes", pasteID)).then((res) => {
            if (!res.exists()) {
                setDocExists(false);
            }
            else {
                setDocExists(true);
            } // Fix: responsive font size (rem)
            if (res.get("password") != undefined) {
                setPassword(res.data("password"));
            }
            else {
                setPassword(undefined);
            }
            setData({ ...res.data() });

        })
    }, [])
    const submitPassword = () => {

        console.log(password.password);
        if (enteredPassword != password.password) {
            setError(true);
            return;
        }
        else {
            setError(false);
            setPassword(null);
            return;
        }
    }
    return (
        <>
            {!docExists ? <StyledAlert severity="error">This paste does not exist.</StyledAlert> : <>{password != undefined ?
                <div className='content-container center'>
                    <p>THIS PASTE IS <span style={{ color: 'crimson' }}>LOCKED</span> <br /> <span style={{ fontSize: '0.7rem' }}>ENTER PASSWORD TO UNLOCK</span></p>

                    <Container sx={{ display: 'flex', alignItems: 'center', columnGap: '15px' }}>
                        <TextField onChange={(e) => setEnteredPassword(e.target.value)} fullWidth inputProps={{ style: { color: 'white' } }} placeholder='Enter password' color='error'></TextField>
                        <div className="hoverable" onClick={() => submitPassword()}><Send /></div>

                    </Container>
                    {error && <StyledAlert severity='error'>You have entered the wrong password.</StyledAlert>}
                </div>
                : <>
                    <div>{<PasteTable author={data.author} title={data.title} content={data.content} pasteId={pasteID} createdAt={data.createdAt} />}</div>
                    <div className='content-container'>
                        <p id='header'>CONTENT</p>
                        <div id='content'>
                            {data.content}
                        </div>
                    </div>
                </>}</>}

        </>
    )

}
const StyledAlert = styled(Alert)(({ theme }) => ({
    backgroundColor: 'rgb(14,14,14)', color: 'crimson'
}))