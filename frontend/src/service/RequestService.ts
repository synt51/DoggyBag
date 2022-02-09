import axios from "axios";
import {LoginData} from "../models/LoginData";
import {RegisterData} from "../models/RegisterData";

export const loginRequest = (loginInput: LoginData) =>
    axios.post("auth/login", loginInput)
        .then(response => response.data)
        .catch(function (error) {
            if (error.response.status === 400){
                alert("Please check your username and password")
                console.log(error)
            }
        })

export const registerRequest = (loginInput: RegisterData) =>
    axios.post("/api/register", loginInput)
        .then(response => response.data)
        .catch(console.error)