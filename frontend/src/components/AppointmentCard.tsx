import './AppointmentCard.scss';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthProvider";
import Appointment from "../models/Appointment";


export default function AppointmentCard() {

    const [appointments, setAppointments] = useState<Appointment[]>([])

    const {token} = useContext(AuthContext)

    useEffect(() => {
        axios.get("/api/appointments", token? {
            headers: {
                "Authorization": token
            }
        } : {})
            .then(response => {
                setAppointments(response.data)
            })
            .catch(console.error)
    }, [])

    return (
        <div className="card">
            {appointments?.map((appointment: Appointment) => (
                <div key={appointment.username}>
                    <h3>{appointment.appointmentName}</h3>
                    <ul>
                        <li>{appointment.dateAndTime}</li>
                    </ul>
                </div>
            ))}
        </div>
    )
}