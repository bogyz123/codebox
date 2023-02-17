import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TextFieldStyled from "./TextFieldStyled";
import { setNickname } from "./UserSlice";

export default function Register() { // Registration page - page za registrovanje
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const auth = getAuth();


    const register = () => {
        if (email == null || password == null) {
            alert("Please, input all the fields!");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password).then(() => {
            nav("/");
        })
    }


    return (
        <div className='login-container'>
            <form className='login-form'>
                <Typography variant="h5" fontFamily='Roboto Condensed' textAlign='center'>
                    Register
                </Typography>

                <Typography variant='p' fontSize='.5rem' fontFamily='Lucida Sans, sans-serif' color='gray' >
                    PLEASE CREATE AN ACCOUNT TO USE CODEBOX
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