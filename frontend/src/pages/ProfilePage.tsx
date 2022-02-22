import './ProfilePage.scss';
import React, {useContext, useEffect, useState} from "react";
import BagPlace from "../models/BagPlace";
import {getBagPlacesOfUser} from "../service/RequestService";
import BagPlaceCounter from "../components/BagPlaceCounter";
import {AuthContext} from "../context/AuthProvider";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function ProfilePage() {

    const [bagPlaces, setBagPlaces] = useState<BagPlace[]>([])

    const {token} = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        getBagPlacesOfUser(token).then(data => setBagPlaces(data))
        //eslint-disable-next-line
    }, [])

    const handleSettingsButton = () => {
        navigate('/settings')
    }

    console.log(bagPlaces)

    return (
        <div className="profilePage">
            <div className="upperBox">
                    <img className="profilePicture"
                        src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
                        alt=""/>
                <div className="userInfo">
                    <h3>{"username"}</h3>
                    <p>Member since:</p>
                    <p>01.02.2022</p>
                </div>
            </div>
            <div className="userStatistic">
                <h3>You have already marked</h3>
                <div className="bagPlaceCounter">
                    <BagPlaceCounter bagPlaces={bagPlaces}/>
                </div>
                <h3>DoggyBag Places!</h3>
            </div>
            <Button className="settingsButton" variant="contained" style={{backgroundColor: "white", color: "orange"}} onClick={handleSettingsButton}>
                Settings?
            </Button>
        </div>
    )
}