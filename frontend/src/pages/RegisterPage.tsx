import './LoginPage.scss';
import {Button, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {RegisterData} from "../models/RegisterData";
import {useNavigate} from "react-router-dom";
import {registerRequest} from "../service/RequestService";

export default function RegisterPage(){

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const registerData = {username, email, password} as RegisterData;

    const navigate = useNavigate()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        registerRequest(registerData)
            .then(() => {
                navigate('/login')
            })
            .catch(() => console.error)
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }


    return (
        <div className="loginPage">
            <h1>Register</h1>
            <form className="input" onSubmit={handleSubmit}>
                <TextField id="outlined-username" label="Username" required variant="outlined" onChange={onNameChange} value={username}/>
                <TextField id="outlined-email" label="Email" required variant="outlined" onChange={onEmailChange} value={email}/>
                <TextField type="password" id="outlined-password" label="Password" required variant="outlined" onChange={onPasswordChange} value={password}/>
                <Button type="submit" variant="contained" style={{backgroundColor: "white", color: "orange"}} endIcon={<SendIcon />}>
                    Register now!
                </Button>
            </form>
        </div>
    )
}