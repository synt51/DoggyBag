import './MedDog.scss';
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import AppointmentGallery from "../components/AppointmentGallery";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {createAppointment, getAppointments} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";
import Appointment from "../models/Appointment";

export default function MedDog() {

    const [open, setOpen] = useState(false);
    const [appointmentName, setAppointmentName] = useState<string>("")
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>([])

    const {token} = useContext(AuthContext)

    const setupAppointments = () => getAppointments(token).then(data => setAppointments(data))

    useEffect( () => {
        setupAppointments().catch(e => console.log(e.message))
    },[token])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAppointmentName(event.target.value)
    }

    const handleTimeChange = (newEndDate: Date | null) => {
        setEndDate(newEndDate)
    }

    const addNewAppointment = () => {
        if (token) {
            createAppointment({
                appointmentName,
                endDate
            }, token).then(() => getAppointments(token).then(data => setAppointments(data)));
            setOpen(false)
        }
    };


    return (
        <div className="medDog">
            <div className="titleMeddog">
                <h1>MedDog</h1>
                <h4>Your dogs' time companion</h4>
            </div>
            <div className="calendar">
                <Button className="calendarButton" variant="contained" color="success" endIcon={<AddCircleOutlineIcon/>} onClick={handleOpen}>
                    Add an Appointment?
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>New Appointment</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please insert the following information:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="normal"
                            label="Appointment"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            value={appointmentName}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="Date & Time"
                                value={endDate}
                                onChange={handleTimeChange}
                            />
                        </LocalizationProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button variant ="contained" color="error" onClick={handleClose}>Cancel</Button>
                        <Button variant ="contained" color="success" onClick={addNewAppointment}>Add</Button>
                    </DialogActions>
                </Dialog>
                <AppointmentGallery appointments={appointments}/>
            </div>
        </div>
    )
}