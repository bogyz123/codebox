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

export default function PasteTemplate() {
    const [isLocked, setIsLocked] = useState();
    const [data, setData] = useState({});
    const [password, setPassword] = useState();
    const { pasteID } = useParams();

    
    useEffect(() => {
        getDoc(doc(database, "pastes", pasteID)).then((res) => {
            if (res.data("password") != undefined) {
                setPassword(res.data("password"));
                setIsLocked(true);
            }
            else {
                setIsLocked(false);
            }
            setData({ ...res.data() });

        })
    }, [])
    return (
        <>
            <div>{<PasteTable author={data.author} title={data.title} content={data.content} pasteId={pasteID} createdAt={data.createdAt} />}</div>
            <div id='content-container'>
                <p id='header'>CONTENT</p>
                <div id='content'>
                    {data.content}
                </div>
            </div>
        </>
    )
}