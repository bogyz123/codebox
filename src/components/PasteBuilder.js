
import Dialog from "./Dialog";
import "../Styles/PasteBuilder.css";
import { useEffect, useState } from "react";
import { database } from "./Connection";
import { addDoc, collection, doc } from "firebase/firestore";
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ReactDOM from 'react-dom'
import React from 'react'
import "../Styles/Homepage.css";
import "../Styles/Fonts.css";
import CopyToClipboard from "react-copy-to-clipboard";


function PasteBuilder() {
    //#region States
    const [body, setBody] = useState();
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [category, setCategory] = useState('Programming');
    const [copiedText, setCopiedText] = useState();
    const [password, setPassword] = useState();


    //#endregion

    //#region Variables
    const datum = new Date();
    const day = datum.getDate();
    const month = datum.getMonth() + 1;
    const year = datum.getFullYear();
    const concatenated = month + "/" + day + "/" + year;
    console.log(datum.getFullYear());
    const data = {
        body: body, title: title, author: author, category: category, date: concatenated, password:password
    }
    //#endregion

    useEffect(() => {
    }, Object.values(data))

    const countEmpty = () => {
        var count = 0;
        Object.values(data).map((value, index) => {
            if (Object.keys(data)[index] != "password") {
                if (value == null || value == "" || value.length === 0) {
                    count++;
                    
                }
            }
            
        })
        return count;
    }
    const submit = () => {
        
        var count = countEmpty();
        console.log(count);
        if (count <= 0) {
            AddDoc(); // Check if anything is empty
        }
        else {
            ReactDOM.render(<Alert variant="outlined" severity="error">Please fill out all the information.</Alert>, document.getElementById("success-status"));
            return;
        }
    }
    const handleCopyOpen = (action, ID) => {
        let URL = window.location.href + "?/&paste=" + ID;
        switch (action) {
            case "open": {
                window.open(URL);
            }
        }
    }


    const AddDoc = async () => { // When called, adds everything from data object to database.
       if (data.password == undefined || data.password == null){delete data.password}
       {
        
       }
        const added = await addDoc(collection(database, "pastes"), data);
        if (!documentExists(added.id)) {
            ReactDOM.render(<Alert variant='outlined' severity="error">Something unexpeceted happened, try again.</Alert>, document.getElementById("success-status"));
            return false;
        }
        else {
            ReactDOM.render(<Alert variant='outlined' severity="success">Successfully uploaded! <span><CopyToClipboard text={window.location.href + "/&paste=" + added.id}><a className="copy-open" href='#'>| Copy Link </a></CopyToClipboard><a className="copy-open" onClick={() => handleCopyOpen('open', added.id)}>| Open</a></span></Alert>, document.getElementById("success-status"));
            return true;
        }

    }
    const handleTextContent = (e) => {
        setBody(e.target.value);
    }

    return (
        <div id="container">
            <Dialog header='Creating a new paste'>

                <div id='title'>

                    <div className='info-container'>
                        <p>Title</p>
                        <TextField type="text" label='Title' InputLabelProps={{ style: { color: 'rgb(17,199,99' } }} color='success' inputProps={{ style: { color: 'rgb(17,199,99' } }} onChange={(e) => setTitle(e.currentTarget.value)}></TextField>
                    </div>
                    <div className='info-container'>
                        <p id='cat'>Category</p>
                        <FormControl fullWidth style={{ backgroundColor: 'rgb(29,29,29' }}>
                            <InputLabel style={{ backgroundColor: 'rgb(29,29,29', color: 'rgb(17, 199, 99)' }} id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                value={category}
                                label="Category"
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ color: 'rgb(17,199,99)' }}

                            >
                                <MenuItem value='Programming'>Programming</MenuItem>
                                <MenuItem value='Gaming'>Gaming</MenuItem>
                                <MenuItem value='Other'>Other</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className='info-container'>
                        <p>Author</p>
                        <TextField InputProps={{ style: { color: 'rgb(17,199,99)' } }} InputLabelProps={{ style: { color: 'rgb(17, 199, 99)' } }} type="text" label='Author' color='success' onChange={(e) => setAuthor(e.currentTarget.value)}></TextField>
                    </div>

                    <div className='info-container'>
                        <p>Password</p>
                        <TextField onChange={(e) => setPassword(e.target.value)} inputProps={{ style: { color: 'rgb(17,199,99)' } }} InputLabelProps={{ style: { color: 'rgb(17, 199, 99)' } }} type="password" label='Password' color='success' className='in'></TextField>
                    </div>
                </div>
                <div className='info-container' style={{ backgroundColor: 'red', width: '100%' }}>

                </div>
                <p style={{ textAlign: 'center' }}>Content</p>
                <div id='content-box' style={{ marginBottom: '0.7rem' }}>

                    <TextField type="text" inputProps={{ style: { textAlign: 'left', fontFamily: 'Montserrat, sans-serif' } }} fullWidth multiline size='medium' placeholder='Content of the paste' color='success' id='in' onChange={(e) => handleTextContent(e)}></TextField>
                </div>
                <Button color='success' onClick={submit} variant='contained'>Upload</Button>
                <div id='success-status'>

                </div>
            </Dialog>
        </div>
    )
    function documentExists(id) {
        const query = doc(collection(database, "pastes"), id);
        if (query.id == null) {
            return false;
        }
        return true;
    }
}
export default PasteBuilder;