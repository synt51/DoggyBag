import './MedDog.scss';
import React, {ChangeEvent, useContext, useState} from "react";
import AppointmentGallery from "../components/AppointmentGallery";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {createAppointment} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";

export default function MedDog() {

    const [open, setOpen] = useState(false);
    const [appointment, setAppointment] = useState<string>("")
    const [dateAndTime, setDateAndTime] = useState<Date | null>(new Date());

    const {token} = useContext(AuthContext)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAppointment(event.target.value)
    }

    const addNewAppointment = () => {
        console.log(appointment)
        console.log(dateAndTime)
        createAppointment(dateAndTime,  token)
    };

    return (
        <div className="medDog">
            <div className="titleMeddog">
                <h1>MedDog</h1>
                <h4>Your dogs' time companion</h4>
            </div>
            <div className="calendar">
                <Button className="calendarButton" variant="contained" color="success" endIcon={<AddCircleOutlineIcon/>} onClick={handleOpen}>
                    New Appointment?
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
                            value={appointment}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="Date & Time"
                                value={dateAndTime}
                                onChange={setDateAndTime}
                            />
                        </LocalizationProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button variant ="contained" color="error" onClick={handleClose}>Cancel</Button>
                        <Button variant ="contained" color="success" onClick={addNewAppointment}>Add</Button>
                    </DialogActions>
                </Dialog>
                <AppointmentGallery/>
            </div>
        </div>
    )
}