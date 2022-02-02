import React, {FormEvent, useContext, useState} from 'react';
import {Button, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import './LoginPage.scss';
import {loginRequest} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";
import {LoginData} from "../models/LoginData";


export default function LoginPage() {

    const [name, setName] = useState<string>()
    const [password, setPassword] = useState<string>()

    const loginData = {name, password} as LoginData;

    const {setJwt} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        loginRequest(loginData)
            .then((data: string) => {
                setJwt(data)
                navigate('/')
            })
            .catch(()=> console.error)
    }

    return (
        <div className="loginPage">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <TextField className="loginInput" id="outlined-basic" label="Username" required variant="outlined" value={name}/>
                <TextField type="password" className="loginInput" id="outlined-basic" label="Password" required variant="outlined" value={password}/>
                <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                    Log in
                </Button>
            </form>
        </div>
    )
}