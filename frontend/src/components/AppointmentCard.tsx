import './AppointmentCard.scss';
import React, {useContext} from "react";
import {Button} from "@mui/material";
import {deleteAppointment} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";

export default function AppointmentCard(props: any) {

    const {token} = useContext(AuthContext)

    const deleteThisAppointment = () => {
        if (token) {
            deleteAppointment(props.id, token)
        }
    }

    return (
        <div className="card">
            <h2>{props.name}</h2>
            <p>{props.date}</p>
            <Button variant="contained" style={{backgroundColor: "#FF6464", borderRadius: "20px"}}
                    onClick={deleteThisAppointment}>Delete</Button>
        </div>
    )
}