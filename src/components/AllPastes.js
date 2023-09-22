
import styled from "@emotion/styled";
import { Check, Close, ContentCopy, Delete, Edit } from "@mui/icons-material";
import { Alert, AppBar, Button, Dialog, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import "../styles/all-pastes.css";
import { database } from "./Connection";
import { TextStyled } from "./CreatePaste";
import { setPasteObject } from "./PasteSlice";




export default function AllPastes() { // When user requests their own list of pastes, this renders, essentially it gets all pastes from the logged user
    // and displays it in a MaterialUI table.
    // Kada ulogovani korisnik zatrazi svoje paste-ove, trazi paste objekat unutar korisnickom dokumenta u databazi, prikazuje u MUI Table.
    const email = localStorage.getItem("codebox_email");
    const dispatch = useDispatch();
    const pastes = useSelector((state) => state.PasteSlice.pasteObject);
    const [copied, setCopied] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentEditingPaste, setCurrentEditingPaste] = useState({});
    const [editAuthor, setEditAuthor] = useState();
    const [editTitle, setEditTitle] = useState();
    const [editContent, setEditContent] = useState();
    const [successfulEdit, setSuccessfulEdit] = useState(false);
    const [hasNoPastes, setHasNoPastes] = useState();
    useEffect(() => {

        if (!pastes) {
            setHasNoPastes(true);
        }
        else {
            setHasNoPastes(false);
        }

    }, [])

    const removePaste = (index) => {
        const paste = Object.keys(pastes)[index]; // Nalazi index od pastea koji smo kliknuli
        var pasteId = pastes[paste].id;
        const toRemove = doc(database, "users", email); // Referenca ka dokumentu

        updateDoc(toRemove, {
            [`pastes.${pasteId}`]: deleteField() // Trazi paste u dokumentu i brise ga
        }).then(() => {
            deleteDoc(doc(database, "pastes", paste)).then(() => {
                let ar = { ...pastes };
                delete ar[paste];
                dispatch(setPasteObject({ ...ar }));
            });

        })

    }


    const editPaste = (author, title, content, name) => {
        setIsDialogOpen(true);
        setCurrentEditingPaste({ author: author, title: title, content: content, name: name });
    }

    const submitEdit = () => {
        const editReference = doc(database, "users", email);
        const pasteReference = doc(database, "pastes", currentEditingPaste.name);
       

        
        updateDoc(editReference, { [`pastes.${currentEditingPaste.name}.author`]: editAuthor, [`pastes.${currentEditingPaste.name}.title`]: editTitle, [`pastes.${currentEditingPaste.name}.content`]: editContent }).then(() => {
            setSuccessfulEdit(true);
            updateDoc(pasteReference, { author: editAuthor, title: editTitle, content: editContent });
        })
    }





    return (
        <div id='all-pastes'>

            {hasNoPastes ? <Alert severity="warning" sx={{ backgroundColor: 'yellow' }}>You do not have any pastes.</Alert> : <> <p className="center">Showing all pastes of user: {email}</p>
                <center className='center'><small>*Refresh to update</small></center>
                {pastes != undefined && <p className="center" id='amount'>Showing {Object.keys(pastes).length} pastes.</p>}

                <TableContainer>

                    <Table>
                        <TableHead >
                            <TableRow selected>
                                <TableText>ID</TableText>
                                <TableText>Author</TableText>
                                <TableText>Title</TableText>
                                <TableText>Lock Status</TableText>
                                <TableText>Actions</TableText>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {pastes != undefined && Object.values(pastes).map((OBJ, index) => <TableRow key={index} hover selected sx={{ cursor: 'pointer' }}>
                                <TableText><div className='textContainer'>{index}</div></TableText>
                                <TableText><div className='textContainer'>{OBJ.author}</div></TableText>
                                <TableText><div className='textContainer'>{OBJ.title}</div></TableText>
                                {OBJ.password != null ? <TableCell align="center"><div className='lock-status'><Check color='success' /><span style={{ color: 'green' }}>Protected</span></div></TableCell> : <TableCell align='center'><div className='lock-status'><Close color='error' /><span style={{ color: 'crimson' }}>Not Protected</span></div></TableCell>}
                                <TableText>
                                    <div id='paste-actions'>
                                        <div onClick={() => removePaste(index)}><Delete /></div>
                                        <div onClick={() => editPaste(OBJ.author, OBJ.title, OBJ.content, OBJ.name)}><Edit /></div>
                                        <CopyToClipboard text={`https://bogyz123.github.io/codebox/#/paste/${OBJ.name}`} onCopy={() => setCopied(true)}>
                                            <ContentCopy />
                                        </CopyToClipboard>
                                        <Dialog open={isDialogOpen} fullScreen>
                                            <AppBar>
                                                <div id='app-bar'>
                                                    <div id='close'>
                                                        <div id='editing-paste'><Typography variant='h3' fontFamily='Kanit, sans-serif' textAlign='center'>Editing paste</Typography></div>
                                                        <div id='close-dialog' onClick={() => setIsDialogOpen(false)}><Close /> </div>
                                                    </div>

                                                    <div id='form'>
                                                        <div>Author</div>
                                                        <div>Title</div>

                                                        <div>
                                                            <TextField fullWidth inputProps={{ style: { color: 'white', fontFamily: 'Roboto Condensed' } }} defaultValue={currentEditingPaste["author"]} onChange={(e) => setEditAuthor(e.target.value)} color='success'></TextField>
                                                        </div>
                                                        <div>
                                                            <TextField fullWidth inputProps={{ style: { color: 'white', fontFamily: 'Roboto Condensed' } }} defaultValue={currentEditingPaste["title"]} onChange={(e) => setEditTitle(e.target.value)} color='success'></TextField>
                                                        </div>


                                                        <div id='content'>
                                                            <div>Content</div>
                                                            <TextStyled inputProps={{ style: { color: 'white', fontFamily: 'Roboto Condensed' } }} multiline color='success' onChange={(e) => setEditContent(e.target.value)} fullWidth defaultValue={currentEditingPaste["content"]}></TextStyled>
                                                        </div>
                                                        <div id='edit-button' onClick={() => submitEdit()}>
                                                            <Button fullWidth variant='contained' color='success' onClick={() => submitEdit()}>Edit</Button>
                                                        </div>
                                                        {successfulEdit && <Snackbar onClose={() => setSuccessfulEdit(false)} autoHideDuration={3000} open={successfulEdit}><Alert severity="success">Successfully edited the paste.</Alert></Snackbar>}


                                                    </div>
                                                </div>


                                            </AppBar>


                                        </Dialog>


                                    </div>

                                </TableText>


                            </TableRow>)}
                        </TableBody>

                    </Table>

                </TableContainer>
                <Snackbar open={copied} autoHideDuration={3000} onClose={() => setCopied(false)}>
                    <Alert severity="success">Successfully copied the link.</Alert>
                </Snackbar></>}
        </div>
    )
}
export const TableText = styled(TableCell)(({ theme }) => ({
    fontFamily: 'Kanit, sans-serif',
    fontSize: '1rem',
    color: '#fff',

}))

