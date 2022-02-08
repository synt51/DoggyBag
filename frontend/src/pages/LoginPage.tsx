import React, {ChangeEvent, FormEvent, useContext, useState} from 'react';
import {Button, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import './LoginPage.scss';
import {loginRequest} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";
import {Link, useNavigate} from "react-router-dom";
import {LoginData} from "../models/LoginData";


export default function LoginPage() {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const loginData = {username, password} as LoginData;

    const {setJwt} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        loginRequest(loginData)
            .then((data: string) => {
                setJwt(data)
                navigate('/')
            })
            .catch(() => console.error)
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    return (
        <div className="loginPage">
            <div className="loginBox">
                <h1>Login</h1>
                <form className="input" onSubmit={handleSubmit}>
                    <TextField className="loginInput" id="outlined-basic" label="Username" required variant="outlined"
                               onChange={onNameChange} value={username}/>
                    <TextField type="password" className="loginInput" id="outlined-basic" label="Password" required
                               variant="outlined" onChange={onPasswordChange} value={password}/>
                    <Button type="submit" variant="contained" endIcon={<SendIcon/>}>
                        Log in
                    </Button>
                </form>
            </div>
            <div className="registerBox">
                <h3>Still not registered?</h3>
                <Button className="registerButton" variant="contained">
                    <Link to="/registration">
                        -Then click here-
                    </Link>
                </Button>
            </div>
        </div>
    )
}