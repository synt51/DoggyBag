import { useState} from "react";
import Appointment from "../models/Appointment";


const UseAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([])


    return {appointments, setAppointments};
};

export default UseAppointments;