import {Button, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, {FormEvent, useContext, useState} from "react";
import {RegisterData} from "../models/RegisterData";
import {useNavigate} from "react-router-dom";
import {registerRequest} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";

export default function RegisterPage(){

    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    const registerData = {name, email, password} as RegisterData;

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


    return (
        <div className="loginPage">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <TextField className="loginInput" id="outlined-basic" label="Username" required variant="outlined" value={name}/>
                <TextField className="loginInput" id="outlined-basic" label="Email" required variant="outlined" value={email}/>
                <TextField type="password" className="loginInput" id="outlined-basic" label="Password" required variant="outlined" value={password}/>
                <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                    Register now
                </Button>
            </form>
        </div>
    )
}