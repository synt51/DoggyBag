import {Button} from "@mui/material";
import './Home.scss';
import L from "leaflet";
import React, {useCallback, useState} from "react";
import {Language} from "@mui/icons-material";
import useGeoLocation from "../hooks/useGeoLocation";
import Map from "../components/Map";
import {QueryClient, QueryClientProvider} from "react-query";


const queryClient = new QueryClient();

export default function Home() {

    const location = useGeoLocation();
    const [map] = useState<L.Map>();
    const ZOOM_LEVEL_CURRENT = 18;

    const showLocation = useCallback(() => {
        if (location.coordinates && map) {
            map.flyTo(location.coordinates, ZOOM_LEVEL_CURRENT)
        }
    }, [map, location])

    return (
        <div className="homePage">
            <div className="upper-box">
                <div className="title">
                    <h1>Getting bags</h1>
                </div>
                {/*shows the current position with doggy bag markers (ALWAYS) */}
                <Button className="locationButton" variant="contained" color="success" endIcon={<Language/>} onClick={showLocation}>
                    Get current location
                </Button>
            </div>
            <div className="lower-box">
                <div className="map">
                    <QueryClientProvider client={queryClient}>
                        <Map/>
                    </QueryClientProvider>
                </div>
                {/*creates new doggy bag marker (ONLY IF LOGGED IN) */}
                <Button className="markerButton" variant="contained" color="success">
                    Mark new Doggy Bag Place
                </Button>
            </div>
        </div>
    )
}