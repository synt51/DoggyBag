import {Button} from "@mui/material";
import './Home.scss';

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
                    <h1>MAP HERE</h1>
                </div>
                {/*creates new doggy bag marker (ONLY IF LOGGED IN) */}
                <Button className="markerButton" variant="contained" color="success">
                    Mark new Doggy Bag Place
                </Button>
            </div>
        </div>
    )
}