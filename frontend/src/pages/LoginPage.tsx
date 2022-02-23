import React, {ChangeEvent, FormEvent, useContext, useState} from 'react';
import {Button, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import './LoginPage.scss';
import {loginRequest} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";
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

    const handleRegisterButton = () => {
        navigate('/registration')
    }

    return (
        <div className="loginPage">
            <div className="loginBox">
                <h1>Login</h1>
                <form className="input" onSubmit={handleSubmit}>
                    <TextField id="outlined-username" label="Username" required variant="outlined"
                               onChange={onNameChange} value={username}/>
                    <TextField type="password" id="outlined-password" label="Password" required
                               variant="outlined" onChange={onPasswordChange}  value={password}/>
                    <Button className="loginButton" type="submit" variant="contained" style={{backgroundColor: "white", color: "orange"}} endIcon={<SendIcon/>}>
                        Log in
                    </Button>
                </form>
            </div>
            <div className="registerBox">
                <Button className="registerButton" variant="contained" style={{backgroundColor: "white", color: "orange"}} onClick={handleRegisterButton}>
                    Still not registered? <br/>-Then click here-
                </Button>
            </div>
        </div>
    )
}