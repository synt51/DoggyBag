import './AppointmentCard.scss';
import React, {useContext} from "react";
import {Button} from "@mui/material";
import {deleteAppointment} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";
import pin from "../resources/images/Pin.png";

export default function AppointmentCard(props: any) {

    const {token} = useContext(AuthContext)

    const deleteThisAppointment = () => {
        if (token) {
            deleteAppointment(props.id, token)
        }
    }

    return (
        <div className="card">
            <img src={pin} alt={""}/>
            <h3>{props.name}</h3>
            <ul>
                <li>{props.date}</li>
            </ul>
            <Button variant="contained" color="error" onClick={deleteThisAppointment}>Delete</Button>
        </div>
    )
}