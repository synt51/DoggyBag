import {Button, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, {ChangeEvent, FormEvent, useContext, useState} from "react";
import {RegisterData} from "../models/RegisterData";
import {useNavigate} from "react-router-dom";
import {registerRequest} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";

export default function RegisterPage(){

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const registerData = {username, email, password} as RegisterData;

    const {setJwt} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        registerRequest(registerData)
            .then((data: string) => {
                setJwt(data)
                navigate('/')
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
            <form onSubmit={handleSubmit}>
                <TextField className="loginInput" id="outlined-basic" label="Username" required variant="outlined" onChange={onNameChange} value={username}/>
                <TextField className="loginInput" id="outlined-basic" label="Email" required variant="outlined" onChange={onEmailChange} value={email}/>
                <TextField type="password" className="loginInput" id="outlined-basic" label="Password" required variant="outlined" onChange={onPasswordChange} value={password}/>
                <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                    Register now
                </Button>
            </form>
        </div>
    )
}