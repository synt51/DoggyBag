import AppointmentCard from "./AppointmentCard";
import './AppointmentGallery.scss';
import Appointment from "../models/Appointment";
import 'moment/locale/de';

interface AppointmentGalleryProps{
    appointments: Appointment[]
    setAppointments: Function
}

export default function AppointmentGallery({appointments, setAppointments}: AppointmentGalleryProps) {

    const sortedAppointments = [...appointments].sort((a, b) => a.endDate > b.endDate ? 1 : -1)

    if(!appointments) {
        return <div className="gallery">
            <h1>loading...</h1>
        </div>
    }

    return (
        <div className="gallery">
            {sortedAppointments
                .map( appointment => (
                <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    setAppointments={setAppointments}
                />
            ))}
        </div>
    )
}