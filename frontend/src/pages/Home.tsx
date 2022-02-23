import './Home.scss';
import React from "react";
import Map from "../components/Map";
import {QueryClient, QueryClientProvider} from "react-query";


const queryClient = new QueryClient();

export default function Home() {

    return (
        <div className="homePage">
            <div className="lower-box">
                <div className="map">
                    <QueryClientProvider client={queryClient}>
                        <Map/>
                    </QueryClientProvider>
                </div>
            </div>
        </div>
    )
}