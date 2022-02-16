import "./ShowBagPlaces.scss";
import React from "react";
import L from "leaflet";
import {Marker} from "react-leaflet";
import BagPlace from "../models/BagPlace";


const bagPlaceIcon = new L.Icon({
    iconUrl: require("../resources/images/logo.png"),
    iconSize: [35, 35]
});

interface ShowBagPlacesProps{
    bagPlaces: BagPlace[]
}

export default function ShowBagPlaces(props: ShowBagPlacesProps){

    const {bagPlaces} = props

    return (
        <>
            {bagPlaces.map((bagPlace) => (
                <Marker
                    key={bagPlace.id}
                    position={[bagPlace.lat, bagPlace.lng]}
                    icon={bagPlaceIcon}>
                </Marker>))}
        </>
    );

}