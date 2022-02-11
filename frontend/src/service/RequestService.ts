import axios from "axios";
import {LoginData} from "../models/LoginData";
import {RegisterData} from "../models/RegisterData";
import {BagPlaceCreationDTO} from "../models/BagPlaceCreationDTO";

export const loginRequest = (loginInput: LoginData) =>
    axios.post("auth/login", loginInput)
        .then(response => response.data)
        .catch(function (error) {
            if (error.response.status === 400) {
                alert("Please check your username and password")
                console.log(error)
            }
        })

export const registerRequest = (loginInput: RegisterData) =>
    axios.post("/api/register", loginInput)
        .then(response => response.data)
        .catch(console.error)

export const createBagPlace = (newMarker: BagPlaceCreationDTO, token?: string) => {
    return axios.post("/api/bagplaces", newMarker, token ? {
        headers: {
            "Authorization": token
        }
    } : {})
        .then(response => response.data)
        .catch(function (error) {
            if (error.response.status === 500) {
                alert("Are you logged in?")
                console.log(error)
            }
        })
}

export const getBagPlaces = () =>
    axios.get("/api/bagplaces")
        .then(response => response.data)