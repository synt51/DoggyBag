import {Button} from "@mui/material";
import './Home.scss';

export default function Home() {


    return (
        <div className="homePage">
            <div className="title">
                <h1>Getting bags</h1>
            </div>
            <Button className="locationButton" variant="contained" color="success">Get current location </Button>
        </div>
    )
}