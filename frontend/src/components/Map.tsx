import {MapContainer, Marker, TileLayer} from "react-leaflet";
import ShowBagPlaces from "./ShowBagPlaces";
import React, { useCallback, useContext, useEffect, useState} from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import L from "leaflet";
import {Language} from "@mui/icons-material";
import {Button} from "@mui/material";
import './Map.scss';
import {createBagPlace, getBagPlaces} from "../service/RequestService";
import {AuthContext} from "../context/AuthProvider";
import BagPlace from "../models/BagPlace";

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
    const [bagPlaces, setBagPlaces] = useState<BagPlace[]>([])

    const {token} = useContext(AuthContext)

    const setupBagPlaces = () => getBagPlaces().then(data => setBagPlaces(data))

    useEffect( () => {
        setupBagPlaces().catch(e => console.log(e.message))
    },[])

    const showLocation = useCallback(() => {
        if (location.coordinates && map) {
            map.flyTo(location.coordinates, ZOOM_LEVEL_CURRENT)
        }
    }, [map, location])

    const createMarkerAtLocation = () => {
        if (location.coordinates && map) {
            createBagPlace(location.coordinates, token).then(() => getBagPlaces().then(data => setBagPlaces(data)));
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
                    />
                )}
                <ShowBagPlaces bagPlaces={bagPlaces}/>
            </MapContainer>
            {/*creates new doggy bag marker (ONLY IF LOGGED IN) */}
            <Button className="markerButton" variant="contained" color="success" onClick={createMarkerAtLocation}>
                Mark new Doggy Bag Place
            </Button>
        </>
    );
}