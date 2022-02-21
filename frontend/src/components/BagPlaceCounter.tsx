import BagPlace from "../models/BagPlace";
import bagPlaceLogo from "../resources/images/logo.png";
import "./BagPlaceCounter.scss"


interface BagPlacesProps{
    bagPlaces: BagPlace[]
}
export default function BagPlaceCounter(props: BagPlacesProps){

    const {bagPlaces} = props

    const bagPlaceCount = bagPlaces.length;

    return(
        <div className="bagPlaceCounter">
            <h1>{bagPlaceCount}</h1>
            <img src={bagPlaceLogo} alt={""}/>
        </div>
    )
}