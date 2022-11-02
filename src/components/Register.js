import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, database } from "./Connection";
import { TextStyled } from "./CreatePaste";
import TextFieldStyled from "./TextFieldStyled";
import { setNickname, setPastes } from "./UserSlice";

export default function Register() { // Registration page - page za registrovanje
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const nav = useNavigate();
    const auth = getAuth();


    const register = () => {
        createUserWithEmailAndPassword(auth, email, password).then((user) => {
            nav("/");
        })
    }


    return (
        <div id='login-container'>
            <form id='login-form'>
                <Typography variant="h5" fontFamily='Roboto Condensed' textAlign='center'>
                    Register
                </Typography>

                <Typography variant='p' fontSize='.5rem' fontFamily='Lucida Sans, sans-serif' color='gray' >
                    PLEASE CREATE AN ACCOUNT TO USE OUR SERVICE
                </Typography>

                <Stack direction='column' rowGap='10px' id='stack'>
                    <TextFieldStyled labelColor='#ccc' ff='Roboto Condensed' size='small' label='Email' type='email' onChange={(e) => setEmail(e.target.value)} required></TextFieldStyled>
                    <TextFieldStyled labelColor='#ccc' ff='Roboto Condensed' size='small' label='Password' type='password' onChange={(e) => setPassword(e.target.value)} required></TextFieldStyled>
                    <TextFieldStyled labelColor='#ccc' ff='Roboto Condensed' size='small' label='Nickname' type='text' onChange={(e) => dispatch(setNickname(e.target.value))} required></TextFieldStyled>
                    <Button size='medium' variant='contained' color='warning' onClick={() => register()}>Register</Button>
                    <Link to='/login' className="link">Login</Link>

                </Stack>


            </form>
        </div>
    )
}