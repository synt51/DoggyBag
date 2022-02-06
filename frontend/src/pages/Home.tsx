import {Button} from "@mui/material";
import './Home.scss';
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";


const DEFAULT_LATITUDE =48;
const DEFAULT_LANGITUDE =-123;

export default function Home() {


    return (
        <div className="homePage">
            <div className="upper-box">
                <div className="title">
                    <h1>Getting bags</h1>
                </div>
                {/*shows the current position with doggy bag markers (ALWAYS) */}
                <Button className="locationButton" variant="contained" color="success">
                    Get current location
                </Button>
            </div>
            <div className="lower-box">
                <div className="map">
                    <MapContainer center={[50.941278, 6.958281]} zoom={13}>
                        <TileLayer
                            attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenTestStreetMap</a> contributors'}
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[50.941278, 6.958281]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
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