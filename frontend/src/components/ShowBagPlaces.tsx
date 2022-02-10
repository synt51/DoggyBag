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

    const points = data?.map((bagPlace: any) => ({
        type: "Feature",
        properties: {cluster: false, bagPlaceId: bagPlace.id},
        geometry: {
            type: "Point",
            coordinates: [
                parseFloat(bagPlace.longitude),
                parseFloat(bagPlace.latitude),
            ],
        },
    }));

    const {clusters, supercluster} = useSupercluster({
        points: points,
        bounds: bounds,
        zoom: zoom,
        options: {radius: 75, maxZoom: 17},
    });

    console.log(clusters.length);
    console.log(data)
    console.log(data[0].lat)
    console.log(data.lng)


    return (
        <>
                <Marker
                    position={[data[0].lat, data[0].lng]}
                    icon={bagPlaceIcon}/>
        </>
        // <>
        //     {clusters.map((cluster) => {
        //         // every cluster point has coordinates
        //         const [longitude, latitude] = cluster.geometry.coordinates;
        //         // the point may be either a cluster or a crime point
        //         const { cluster: isCluster, point_count: pointCount } =
        //             cluster.properties;
        //
        //         // we have a cluster to render
        //         if (isCluster) {
        //             return (
        //                 <Marker
        //                     key={`cluster-${cluster.id}`}
        //                     position={[latitude, longitude]}
        //                     icon={fetchIcon(
        //                         {count: pointCount, size: 10 + (pointCount / points.length) * 40}
        //                     )}
        //                     eventHandlers={{
        //                         click: () => {
        //                             const expansionZoom = Math.min(
        //                                 supercluster.getClusterExpansionZoom(cluster.id),
        //                                 maxZoom
        //                             );
        //                             map.setView([latitude, longitude], expansionZoom, {
        //                                 animate: true,
        //                             });
        //                         },
        //                     }}
        //                 />
        //             );
        //         }
        //
        //         // we have a single point (crime) to render
        //         return (
        //             <Marker
        //                 position={[data[0].lat, data[0].lng]}
        //                 icon={bagPlaceIcon}
        //             />
        //         );
        //     })}
        // </>
    );

}