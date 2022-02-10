import "./ShowBagPlaces.scss";
import React from "react";
import L from "leaflet";
import {Marker} from "react-leaflet";


const bagPlaceIcon = new L.Icon({
    iconUrl: require("../resources/images/logo.png"),
    iconSize: [35, 35]
});


export default function ShowBagPlaces({data}: { data: any }) {


    return (
        data.map((d: any) => (
            <Marker key={d.id} position={[d.lat, d.lng] } icon={bagPlaceIcon}></Marker>))
    );

}