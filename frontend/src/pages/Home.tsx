import {Button} from "@mui/material";
import './Home.scss';
import {MapContainer, TileLayer, Marker} from "react-leaflet";
import L from "leaflet";
import React, {useCallback, useEffect, useState} from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import {Language} from "@mui/icons-material";


const markerIcon = new L.Icon({
    iconUrl: require("../resources/images/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46], //[left/right, top/bottom]
});

export default function Home() {

    const location = useGeoLocation();
    const [map, setMap] = useState<L.Map>();
    const [center, setCenter] = useState({lat: 50.941278, lng: 6.958281});
    const ZOOM_LEVEL_DEFAULT = 13;
    const ZOOM_LEVEL_CURRENT = 16;

    const showLocation = useCallback(() => {
        if (location.coordinates && map) {
            map.flyTo(location.coordinates, ZOOM_LEVEL_CURRENT)
            console.log(location.coordinates)
        }
    }, [map, location])


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
        <div className="homePage">
            <div className="upper-box">
                <div className="title">
                    <h1>Getting bags</h1>
                </div>
                {/*shows the current position with doggy bag markers (ALWAYS) */}
                <Button className="locationButton" variant="contained" color="success" endIcon={<Language/>}
                        onClick={showLocation}>
                    Get current location
                </Button>
            </div>
            <div className="lower-box">
                <div className="map">
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
                    </MapContainer>
                </div>
                {/*creates new doggy bag marker (ONLY IF LOGGED IN) */}
                <Button className="markerButton" variant="contained" color="success">
                    Mark new Doggy Bag Place
                </Button>
            </div>
        </div>
    )
}