import './AppointmentCard.scss';
import React, {useContext} from "react";
import {Button} from "@mui/material";
import {deleteAppointment, getAppointments} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";
import {motion} from "framer-motion";

export default function AppointmentCard(props: any) {

    const {token} = useContext(AuthContext)

    const setupAppointments = () => {
        getAppointments(token).then(data => props.setAppointments(data))
    }

    const deleteThisAppointment = () => {
        if (token) {
            deleteAppointment(props.id, token).then(setupAppointments)
        }
    }

    return (
        <motion.div className="card">
            <h2>{props.name}</h2>
                <div className="lowerPart">
                    <p>{props.date}</p>
                    <Button variant="contained" style={{backgroundColor: "#FF6464", borderRadius: "20px"}}
                            onClick={deleteThisAppointment}>Delete</Button>
                </div>
        </motion.div>
    )
}