import './MedDog.scss';
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import AppointmentGallery from "../components/AppointmentGallery";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {createAppointment, getAppointments} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";
import UseAppointments from "../hooks/UseAppointments";

export default function MedDog() {

    const [open, setOpen] = useState<boolean>(false);
    const [appointmentName, setAppointmentName] = useState<string>("")
    const [endDate, setEndDate] = useState<Date>(new Date());

    const {token} = useContext(AuthContext)

    const {appointments, setAppointments} = UseAppointments()

    const setupAppointments = () => getAppointments(token).then(data => setAppointments(data))

    useEffect( () => {
        setupAppointments().catch(e => console.log(e.message))

        //eslint-disable-next-line
    },[])

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
        if(newEndDate !== null) {
            setEndDate(newEndDate)
        } else {
            alert("Please set a date")
        }
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
                <p>Your dogs' time companion</p>
            </div>
            <div className="calendar">
                <Button className="calendarButton" variant="contained" style={{backgroundColor: "white", color: "orange", borderRadius:"15px"}} endIcon={<AddCircleOutlineIcon/>} onClick={handleOpen}>
                    New <br/> Appointment?
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
                        <Button variant ="contained" style={{backgroundColor: "#FF6464"}} onClick={handleClose}>Cancel</Button>
                        <Button variant ="contained" style={{backgroundColor: "#4caf50"}} onClick={addNewAppointment}>Add</Button>
                    </DialogActions>
                </Dialog>
                <AppointmentGallery appointments={appointments} setAppointments={setAppointments}/>
            </div>
        </div>
    )
}