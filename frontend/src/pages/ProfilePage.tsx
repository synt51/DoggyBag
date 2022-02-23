import './ProfilePage.scss';
import React, {useContext, useEffect, useState} from "react";
import BagPlace from "../models/BagPlace";
import {getBagPlacesOfUser} from "../service/RequestService";
import BagPlaceCounter from "../components/BagPlaceCounter";
import {AuthContext} from "../context/AuthProvider";
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";


export default function ProfilePage() {

    const [bagPlaces, setBagPlaces] = useState<BagPlace[]>([])

    const {token} = useContext(AuthContext)

    const decoded: {sub: string} | undefined = token ? jwt_decode(token) : undefined

    const navigate = useNavigate()

    useEffect(() => {
        getBagPlacesOfUser(token).then(data => setBagPlaces(data))
        //eslint-disable-next-line
    }, [])

    const handleSettingsButton = () => {
        navigate('/settings')
    }

    return (
        <div className="profilePage">
            <div className="upperBox">
                <img className="profilePicture"
                     src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"}
                     alt=""/>
                {decoded === undefined ?
                    navigate('/login')
                    :
                    <div className="userInfo">
                        <h3>{decoded.sub}</h3>
                    </div>
                }
            </div>
            <div className="userStatistic">
                <h3>The community has already marked</h3>
                <div className="bagPlaceCounter">
                    <BagPlaceCounter bagPlaces={bagPlaces}/>
                </div>
                <h3>DoggyBag Places!</h3>
            </div>
            <Button className="settingsButton" variant="contained" style={{backgroundColor: "white", color: "orange"}}
                    onClick={handleSettingsButton}>
                Settings?
            </Button>
        </div>
    )
}