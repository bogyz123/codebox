import { database } from "./Connection";
import "../styles/Login.css";
import { Button, TextField, Typography, useRadioGroup } from "@mui/material";
import { Stack } from "@mui/system";
import { TextStyled } from "./CreatePaste";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextFieldStyled from "./TextFieldStyled";
import { useDispatch } from "react-redux";
import { setNickname } from "./UserSlice";
import { addDoc, doc, getDoc } from "firebase/firestore";


export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const nav = useNavigate();
    const dispatch = useDispatch();
    const auth = getAuth();

    const login = () => {
        signInWithEmailAndPassword(auth, email, password).then((user) => {
            nav("/");
        })
    }

    return (
        <div id='login-container'>
            <form id='login-form'>
                <Typography variant="h5" fontFamily='Roboto Condensed' textAlign='center'>
                    Login
                </Typography>

                <Typography variant='p' fontSize='.5rem' fontFamily='Lucida Sans, sans-serif' color='gray' >
                    PLEASE LOGIN TO USE OUR SERVICE
                </Typography>

                <Stack direction='column' rowGap='10px' id='stack'>
                    <TextFieldStyled labelColor='#ccc' size='small' label='Email' type='email' onChange={(e) => setEmail(e.target.value)} required></TextFieldStyled>
                    <TextFieldStyled labelColor='#ccc' size='small' label='Password' type='password' onChange={(e) => setPassword(e.target.value)} required></TextFieldStyled>
                    <Button size='medium' variant='contained' color='warning' onClick={() => login()}>Login</Button>
                    <Link to='/register' className="link">Register</Link>

                </Stack>


            </form>
        </div>
    )
}