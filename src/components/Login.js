import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import TextFieldStyled from "./TextFieldStyled";


export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const nav = useNavigate();
    const auth = getAuth();

    const login = () => {
        signInWithEmailAndPassword(auth, email, password).then((user) => {
            nav("/");
        })
    }

    return (
        <div className='login-container'>
            <form className='login-form'>
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