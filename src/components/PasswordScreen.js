import { Alert, Button, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { database } from "./Connection";
import Paste from "./Paste";



function PasswordScreen({ docID }) {
    const [data, setData] = useState({});
    const [enteredPassword, setEnteredPassword] = useState();
    const [rightPass, setRightPass] = useState(false);
    useEffect(() => {
        const fetch = async (ID) => {
            const ref = doc(database, "pastes", ID);
            const snap = await getDoc(ref);
            setData({ password: snap.get("password"), title: snap.get("title"), body: snap.get("body"), author: snap.get("author"), date: snap.get("date"), category: snap.get("category") });
        }
        fetch(docID);
    }, [])
    const styles = {
        center: { textAlign: 'center' },
        subContainer: {
            borderRadius: '4px',
        },
        p: { textAlign: 'center', color: '#FFF' }, span: { fontWeight: 'bold', color: 'crimson' },
        input: { display: 'flex', flexDirection: 'column', rowGap: '5px' },
        container: { width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }
    }
    const handler = () => {
        if (enteredPassword != data.password) {
            ReactDOM.render(<Alert severity="error" variant="outlined" style={{ color: 'red' }}>You have entered the wrong password.</Alert>, document.getElementById("status"));
            return;
        }
        else {
            setRightPass(true);
        }
    }


    return (
        <>

            {rightPass ? <div><Paste  category={data.category} title={data.title} author={data.author} body={data.body} date={data.date} /></div> : <div style={styles.container}>
                <Container style={styles.subContainer}>
                    <p style={styles.p}>Enter password for <span style={styles.span}>{data.title}</span></p>
                    <div style={styles.input}>
                        <TextField type='password' fullWidth variant="outlined" color='error' onChange={(e) => setEnteredPassword(e.target.value)} InputProps={{ style: { color: 'crimson', fontSize: '1.3rem' } }} />
                        <Button onClick={() => handler()} variant='contained' fullWidth color='error'>Unlock</Button>
                        <div id='status'></div>
                    </div>

                </Container>
            </div>}
        </>


    )
}
export default PasswordScreen;