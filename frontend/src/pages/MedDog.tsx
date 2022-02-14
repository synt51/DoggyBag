import './MedDog.scss';
import React from "react";
import AppointmentGallery from "../components/AppointmentGallery";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export default function MedDog() {

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState<Date | null>(new Date());

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className="medDog">
            <div className="titleMeddog">
                <h1>MedDog</h1>
                <h4>Your dogs' time companion</h4>
            </div>
            <div className="calendar">
                <Button className="calendarButton" variant="contained" color="success" endIcon={<AddCircleOutlineIcon/>} onClick={handleClickOpen}>
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
                            margin="dense"
                            id="name"
                            label="Appointment"
                            type="name"
                            fullWidth
                            variant="standard"
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="Date & Time"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                            />
                        </LocalizationProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button variant ="contained" color="error" onClick={handleClose}>Cancel</Button>
                        <Button variant ="contained" color="success" onClick={handleClose}>Add</Button>
                    </DialogActions>
                </Dialog>
                <AppointmentGallery/>
            </div>
        </div>
    )
}