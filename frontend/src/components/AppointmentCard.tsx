import './AppointmentCard.scss';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthProvider";


export default function AppointmentCard() {

    const [appointments, setAppointments] = useState([])

    const {token} = useContext(AuthContext)

    useEffect(() => {
        axios.get("/api/appointments", token? {
            headers: {
                "Authorization": token
            }
        } : {})
            .then(response => {
                console.log(response)
                setAppointments(response.data)
            })
            .catch(console.error)
    }, [])

    return (
        <div className="card">
            {appointments?.map((appointment: any) => (
                <div key={appointment.username}>
                    <h3>{appointment.appointmentName}</h3>
                    <ul>
                        <li>{appointment.endDate}</li>
                    </ul>
                </div>
            ))}
        </div>
    )
}