import "./ShowBagPlaces.scss";
import React, {useCallback, useEffect, useState} from "react";
import L from "leaflet";
import useSupercluster from "use-supercluster";
import {Marker, useMap} from "react-leaflet";

const icons: any = {};
const fetchIcon = ({count, size}: { count: number, size: number }) => {
    if (!icons[count]) {
        icons[count] = L.divIcon({
            html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
            ${count}
            </div>`,
        });
    }
    return icons[count];
};

const bagPlaceIcon = new L.Icon({
    iconUrl: require("../resources/images/logo.png"),
    iconSize: [35, 35]
});


export default function ShowBagPlaces({data}: { data: any }) {
    const maxZoom = 22;
    const [bounds, setBounds]: any[] = useState(null);
    const [zoom, setZoom] = useState(12);
    const map = useMap();

    function updateMap() {
        console.log("updating");
        const b = map.getBounds();
        setBounds([
            b.getSouthWest().lng,
            b.getSouthWest().lat,
            b.getNorthEast().lng,
            b.getNorthEast().lat,
        ]);
        setZoom(map.getZoom());
    }

    const onMove = useCallback(() => {
        updateMap();
    }, [map]);

    React.useEffect(() => {
        updateMap();
    }, [map]);

    useEffect(() => {
        map.on("move", onMove);
        return () => {
            map.off("move", onMove);
        };
    }, [map, onMove]);


    return (
        <>
            <Marker
                position={[data[0].lat, data[0].lng]}
                icon={bagPlaceIcon}/>
            <Marker
                position={[data[1].lat, data[1].lng]}
                icon={bagPlaceIcon}/>
            <Marker
                position={[data[2].lat, data[2].lng]}
                icon={bagPlaceIcon}/>
        </>
    );

}