import './AppointmentCard.scss';
import React, {useContext} from "react";
import {Button} from "@mui/material";
import {deleteAppointment} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";
import pin from "../resources/images/Pin.png";

export default function AppointmentCard(props: any) {

    const {token} = useContext(AuthContext)

    const borderStyleRed = {
        border: "5px solid red",
        borderradius: "19px",
    };

    const borderStyleYellow = {
        border: "5px solid yellow",
        borderradius: "19px",
    };

    const borderStyleGreen = {
        border: "5px solid green",
        borderradius: "19px",
    };

    const deleteThisAppointment = () => {
        if (token) {
            deleteAppointment(props.id, token)
        }
    }

    return (
        <div className="card" style={borderStyleYellow}>
            <img src={pin} alt={""}/>
            <h3>{props.name}</h3>
            <ul>
                <li>{props.date}</li>
            </ul>
            <Button variant="contained" color="error" onClick={deleteThisAppointment}>Delete</Button>
        </div>
    )
}