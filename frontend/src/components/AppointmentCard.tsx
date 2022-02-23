import './AppointmentCard.scss';
import React, {useContext} from "react";
import {Button} from "@mui/material";
import {deleteAppointment, getAppointments} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";
import {motion} from "framer-motion";
import Appointment from "../models/Appointment";
import moment from "moment/moment";

interface AppointmentCardProps{
    appointment: Appointment,
    setAppointments: Function
}

export default function AppointmentCard({appointment, setAppointments}: AppointmentCardProps) {

    const {token} = useContext(AuthContext)

    const setupAppointments = () => {
        getAppointments(token).then(data => setAppointments(data))
    }

    const deleteThisAppointment = () => {
        if (token) {
            deleteAppointment(appointment.id, token).then(setupAppointments)
        }
    }

    return (
        <motion.div className="card">
            <h2>{appointment.appointmentName}</h2>
                <div className="lowerPart">
                    <p>{moment(appointment.endDate).format('lll')}</p>
                    <Button variant="contained" style={{backgroundColor: "#FF6464", borderRadius: "20px"}}
                            onClick={deleteThisAppointment}>Delete</Button>
                </div>
        </motion.div>
    )
}