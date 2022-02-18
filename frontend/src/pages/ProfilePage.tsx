import './ProfilePage.scss';
import {useContext, useEffect, useState} from "react";
import BagPlace from "../models/BagPlace";
import { getBagPlacesOfUser} from "../service/RequestService";
import BagPlaceCounter from "../components/BagPlaceCounter";
import {AuthContext} from "../context/AuthProvider";

export default function ProfilePage(){

    const [bagPlaces, setBagPlaces] = useState<BagPlace[]>([])

    const {token} = useContext(AuthContext)

    const setupBagPlaces = () => getBagPlacesOfUser(token).then(data => setBagPlaces(data))

    useEffect( () => {
        setupBagPlaces().catch(e => console.log(e.message))

        //eslint-disable-next-line
    },[])

    console.log(bagPlaces)

    return(
        <div className="profilePage">
            <h1>{"username"}</h1>
            <div className="userStatistic">
                <p>You have already marked</p>
                <div className="bagPlaceCounter">
                    <BagPlaceCounter bagPlaces={bagPlaces}/>
                </div>
                <p>DoggyBag Places!</p>
            </div>
        </div>
    )
}