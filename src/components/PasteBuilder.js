
import Dialog from "./Dialog";
import "../Styles/PasteBuilder.css";
import { useEffect, useState } from "react";
import { database } from "./Connection";
import { addDoc, collection, doc } from "firebase/firestore";
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ReactDOM from 'react-dom'
import React from 'react'
import "../Styles/Homepage.css";


function PasteBuilder() {
    //#region States
    const [body, setBody] = useState();
    const [title, setTitle] = useState();
    const [author, setAuthor] = useState();
    const [category, setCategory] = useState('Programming');
    
    //#endregion

    //#region Variables
    const datum = new Date();
    const day = datum.getDate();
    const month = datum.getMonth() + 1;
    const year = datum.getFullYear();
    const concatenated = month + "/" + day + "/" + year;
    console.log(datum.getFullYear());
    const data = {
        body: body, title: title, author: author, category: category, date:concatenated
    }
    //#endregion

    useEffect(() => {
        console.log(data);
    }, Object.values(data))

    const countEmpty = () => {
        var count = 0;
        Object.values(data).map((value) => {
            if (value == null || value == "" || value.length === 0) {
                count++;
            }
        })
        return count;
    }
    const submit = () => {
        var count = countEmpty();
        if (count <= 0) {
            AddDoc();
        }
        else {
            ReactDOM.render(<Alert variant="outlined" severity="error">Please fill out the information.</Alert>, document.getElementById("success-status"));
            return;
        }
    }

    const AddDoc = async () => { // When called, adds everything from data object to database.
        const added = await addDoc(collection(database, "pastes"), data);
        if (!documentExists(added.id)) {
            ReactDOM.render(<Alert variant='outlined' severity="error">Something unexpeceted happened, try again.</Alert>, document.getElementById("success-status"));
            return false;
        }
        else {
            ReactDOM.render(<Alert variant='outlined' severity="success">Successfully uploaded!</Alert>, document.getElementById("success-status"));
            return true;
        }
    }

    return (
        <div id="container">
            <Dialog header='Creating a new paste'>

                <div id='title'>

                    <div className='info-container'>
                        <p>Title</p>
                        <TextField type="text" placeholder='Title' color='success' id='in' onChange={(e) => setTitle(e.currentTarget.value)}></TextField>
                    </div>
                    <div className='info-container'>
                        <p>Category</p>
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
                        <TextField inputProps={{ style: { color: 'rgb(17,199,99)' } }} InputLabelProps={{ style: { color: 'rgb(17, 199, 99)' } }} type="password" label='Password' color='success' className='in'></TextField>
                    </div>
                </div>
                <div className='info-container'  style={{ backgroundColor: 'red', width: '100%' }}>

                </div>
                <div className='info-container' id='content-box' style={{ marginBottom: '0.7rem' }}>
                    <p>Content</p>
                    <TextField inputProps={{style:{textAlign:'auto'}}} type="text" size='medium' placeholder='Content of the paste' color='success' id='in' onChange={(e) => setBody(e.currentTarget.value)}></TextField>
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