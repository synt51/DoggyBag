import Appointment from "./Appointment";

export type DeleteAppointment = (id: string) => void

export interface AppointmentController{
    deleteAppointment: (id: string) => Promise<Appointment[]>
}