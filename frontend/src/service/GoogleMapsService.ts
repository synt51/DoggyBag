import {LocationData} from "../models/LocationData";
import axios from "axios";


export const currentLocationRequest = (locationInput: LocationData) =>
    axios.get(`API_endpoint`) //get method for response with LocationData
        .then(response => response.data)
        .catch(console.error)