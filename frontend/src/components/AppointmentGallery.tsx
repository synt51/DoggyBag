import AppointmentCard from "./AppointmentCard";
import './AppointmentGallery.scss';
import Appointment from "../models/Appointment";

interface AppointmentGalleryProps{
    appointments: Appointment[]
}

export default function AppointmentGallery(props: AppointmentGalleryProps) {

    const {appointments} = props

    if(!appointments) {
        return <div className="gallery">
            <h1>loading...</h1>
        </div>
    }

    return (
        <div className="gallery">
            {appointments.map( appointment => (
                <AppointmentCard
                    key={appointment.id}
                    name={appointment.appointmentName}
                    date={appointment.endDate}
                />
            ))}
        </div>
    )
}