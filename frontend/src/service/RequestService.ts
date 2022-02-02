import axios from "axios";
import {LoginData} from "../models/LoginData";
import {RegisterData} from "../models/RegisterData";

export const loginRequest = (loginInput: LoginData) =>
    axios.post("auth/login", loginInput)
        .then(response => response.data)
        .catch(console.error)

export const registerRequest = (loginInput: RegisterData) =>
    axios.post("", loginInput) //todo: insert register url
        .then(response => response.data)
        .catch(console.error)