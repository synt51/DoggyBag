import './MedDog.scss';
import {LocalizationProvider, StaticDatePicker} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {TextField} from "@mui/material";
import React from "react";

export default function MedDog() {

    const [value, setValue] = React.useState<Date | null>(new Date());

    return (
        <div className="medDog">
            <div className="title">
                <h1>MedDog</h1>
                <h4>Your dogs' time companion</h4>
            </div>
            <div className="calendar">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        openTo="year"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>
        </div>
    )
}