import { Logout } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import TextFieldStyled from "./TextFieldStyled";


export default function Navbar() {
    const log = useSelector((state) => state.UserSlice.isLoggedIn);
    const nickname = useSelector((state) => state.UserSlice.nickname);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [searchQuery, setSearchQuery] = useState();
    const [pasteList, setPasteList] = useState([]);
    const [timesSearched, setTimesSearched] = useState(1);
    const [searchResult, setSearchResult] = useState([]);
    const auth = getAuth();

    const nav = useNavigate();
    const logout = () => {
        signOut(auth);
        nav("/");
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
   


    const handleMenu = (action) => {
        switch (action) {
            case 'profile': {
                nav(`user/${nickname}`);
                handleClose();
                break;
            }
            case 'mypastes': {
                nav(`/all-pastes`);
                handleClose();
                break;
            }
            case 'logout': {
                logout();
                handleClose();
                break;
            }
        }
    }


    return (
        <>
            <div id='small-screens'>
                <div id='searchbar'>
                    <TextFieldStyled color='error' size='small' label='Search' labelColor='#fff' ff='Roboto Condensed' fullWidth></TextFieldStyled>

                </div>

                <div
                    onClick={handleClick}
                    id='burger'
                >
                    <MenuIcon />


                </div>
                <Menu

                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}

                >
                    <MenuItem onClick={() => handleMenu('profile')}>Profile</MenuItem>
                    <MenuItem onClick={() => handleMenu('mypastes')}>My Pastes</MenuItem>
                    <MenuItem onClick={() => handleMenu('logout')}>Logout</MenuItem>
                </Menu>



            </div>
            <Container id='navbar'>

                <div className="link" onClick={() => nav("/")}>
                    <Typography variant='h4' sx={{ cursor: 'pointer', fontFamily: 'Bebas Neue' }}>CODEBOX</Typography>
                </div>
                {log && <div  className="link" onClick={() => handleMenu("mypastes")}>
                    <Typography variant='h6' sx={{ cursor: 'pointer', fontFamily: 'Bebas Neue' }}>My Pastes</Typography>
                </div>}

                <div id='searchbar-container'>
                    <TextFieldStyled color='error' size='small'  label='Search for pastes (WORK IN PROGRESS)' labelColor='#fff' ff='Kanit, sans-serif' w='25vw'></TextFieldStyled>

                </div>




                {log ? <><Button variant='contained' color='error' size='small' onClick={() => logout()}><Logout /></Button> {<Link className='link'>{nickname}</Link>} </> : <div id='navbar'>
                    <Link className="link" to='/login'>
                        <Typography variant='h6' sx={{ cursor: 'pointer', fontFamily: 'Bebas Neue' }} >Login</Typography>
                    </Link>
                    <Link className="link" to='/register' id='search-item'>
                        <Typography variant='h6' sx={{ cursor: 'pointer', fontFamily: 'Bebas Neue' }} >Register</Typography>
                    </Link>

                </div>}




            </Container>
        </>

    )
}