import React from 'react';
import {Button, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import './LoginPage.scss';

export default function LoginPage() {

    return (
        <div className="loginPage">
            <h1>Login</h1>
            <form>
                {/*onSubmit={handleSubmit}*/}
                <TextField className="loginInput" id="outlined-basic" label="Username" variant="outlined"/>
                <TextField className="loginInput" id="outlined-basic" label="Password" variant="outlined"/>
                <Button variant="contained" endIcon={<SendIcon />}>
                    Send it
                </Button>
            </form>
        </div>
    )
}