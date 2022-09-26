
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "./Connection";
import Dialog from "./Dialog";
import * as ReactDOM from 'react-dom';
import { Container } from "@mui/system";
import "../Styles/RecentPastes.css";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";


function RecentPastes(props) {

    const [currentQuery, setCurrentQuery] = useState(null);
    const [queryResult, setQueryResult] = useState()
    const [searchCategory, setSearchCategory] = useState('title');

    // Ovo je page za searchovanje za pasteove, popraviti CSS i dodati responsiveness. Popraviti bug sa onChange eventom. 

    useEffect(() => {
        var fetch = async () => {
            var searchQuery = query(collection(database, "pastes"), where(searchCategory, "==", currentQuery));
            var execute = await getDocs(searchQuery);

            if (execute.empty) {
                ReactDOM.render("Nothing found", document.getElementById("status"));
                // Kada se search promeni onda se ovo triggeruje, proverava da li ima rezultat u databazi, ako ima storuje u queryResult kao array docs.
            }
            else {
                setQueryResult(...execute.docs);
                for (let i = 0; i < execute.docs.length; i++) {
                    if (execute.docs.length <= 0) {
                        ReactDOM.render("Nothing found", document.getElementById("status"));
                        return;
                    }

                    ReactDOM.render(<ShowResults len={execute.docs.length} array={execute.docs} />, document.getElementById("status"));
                }
            }

        }
        fetch();

    }, [currentQuery])
    const handler = (e) => {
        setCurrentQuery(e.target.value);
    
    }

    return (
        <Dialog header="Search for pastes"  id='box' height='100vh'>
            <div>
                <div id='textfield-container'>
                    <TextField fullWidth type="text" size='small' variant='outlined' color='success' label='Search...' InputLabelProps={{ style: { color: 'green', fontFamily: 'Montserrat, sans-serif' } }} InputProps={{ style: { color: 'green', fontFamily: 'Montserrat, sans-serif' } }} onChange={handler} />
                </div>


                <FormControl fullWidth style={{ backgroundColor: 'rgb(29,29,29' }} sx={{ marginTop: '5px' }}>
                    <InputLabel style={{ backgroundColor: 'rgb(29,29,29', color: 'rgb(17, 199, 99)', fontFamily: 'Montserrat, sans-serif' }} id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        value={searchCategory}

                        label="Search by"
                        onChange={(e) => setSearchCategory(e.target.value)}
                        style={{ color: 'rgb(17,199,99)', fontFamily: 'Montserrat,' }}

                    >
                        <MenuItem value='title'>Title</MenuItem>
                        <MenuItem value='author'>Author</MenuItem>
                    </Select>
                </FormControl>

            </div>

            {<><p>Search Results: </p><div id='status'>Nothing found.</div></>}
            <p style={{color:'orange'}}>Made by Bogdan :D</p>
        </Dialog>
    )
}
function ShowResults(props) {

    const styles = {
        borderBottom: '1px solid black'
    }
    return (
        <div style={{ styles }}>
            <p>The search query has found: {props.len} results.</p>
            <ul id='result-container'>
                {props.array.map((result, index) => { return <Result color='crimson' refer={result.id} docTitle='a' index={index} title={result.get("title")}>{result.get("date")}</Result> })}
            </ul>
        </div>
    )
}
function Result(props) {
    const styles = {
        border: '1px solid black',
        backgroundColor: props.color,
        color: "#FFF",
        cursor: 'pointer',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-between'

    }
    return (
        <Container style={styles} id='result' onClick={() => window.location.href = '?/&paste=' + props.refer}>

            {props.index} {'|'} {props.title}
            <div>{props.children}</div>
        </Container>
    )
}

export default RecentPastes;