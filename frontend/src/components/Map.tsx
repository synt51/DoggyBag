import {MapContainer, Marker, TileLayer} from "react-leaflet";
import ShowBagPlaces from "./ShowBagPlaces";
import React, { useCallback, useContext, useEffect, useState} from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import L from "leaflet";
import {useQuery} from "react-query";
import axios from "axios";
import {Language} from "@mui/icons-material";
import {Button} from "@mui/material";
import './Map.scss';
import {createBagPlace} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";
import {useNavigate} from "react-router-dom";

const markerIcon = new L.Icon({
    iconUrl: require("../resources/images/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
});

export default function Map() {
    const location = useGeoLocation();
    const [map, setMap] = useState<L.Map>();
    const [center, setCenter] = useState({lat: 50.941278, lng: 6.958281});
    const ZOOM_LEVEL_DEFAULT = 7;
    const ZOOM_LEVEL_CURRENT = 18;

    const {token} = useContext(AuthContext)

    const navigate = useNavigate()

    const showLocation = useCallback(() => {
        if (location.coordinates && map) {
            map.flyTo(location.coordinates, ZOOM_LEVEL_CURRENT)
            console.log(location.coordinates)
        }
    }, [map, location])


    const createMarkerAtLocation = () => {
        if (location.coordinates && map) {
            console.log(location.coordinates)
            createBagPlace(location.coordinates, token)
            navigate('/')
        }
    }


    const onMove = useCallback(() => {
        if (map?.getCenter()) {
            setCenter(map?.getCenter())
        }
    }, [map])

    useEffect(() => {
        map?.on('move', onMove)
        return () => {
            map?.off('move', onMove)
        }
    }, [map, onMove])

    const {data, status} = useQuery("bagPlaces", () =>
        axios.get(
            "/api/bagplaces"
        ).then((res) => res.data)
    );

    console.log(data);

    return (
        <>
            <Button className="locationButton" variant="contained" color="success" endIcon={<Language/>}
                    onClick={showLocation}>
                Get current location
            </Button>
            <MapContainer center={center} zoom={ZOOM_LEVEL_DEFAULT} whenCreated={setMap}>
                <TileLayer
                    attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                />
                {location.loaded && !location.error && location.coordinates && (
                    <Marker
                        icon={markerIcon}
                        position={[
                            location.coordinates.lat,
                            location.coordinates.lng,
                        ]}
                    ></Marker>
                )}
                {status === 'loading' && (
                    <div>Loading data...</div>
                )}
                {status === 'error' && (
                    <div>Error fetching data</div>
                )}
                {status === 'success' && (
                    <ShowBagPlaces data={data}/>
                )}
            </MapContainer>
            {/*creates new doggy bag marker (ONLY IF LOGGED IN) */}
            <Button className="markerButton" variant="contained" color="success" onClick={createMarkerAtLocation}>
                Mark new Doggy Bag Place
            </Button>
        </>
    );
}