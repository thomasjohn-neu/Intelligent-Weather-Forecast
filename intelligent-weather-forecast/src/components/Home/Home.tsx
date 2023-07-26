import './home.scss';
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import { cities } from '../../constants/cities';

interface Props {
    onDetailViewEvent: (city: string, weatherData:any) => void,
    selectedUnit: string
}

export default function  Home(props: Props){ 
    return (
        <div data-testid="home-container" className="container">
            <div className="row top">
                <WeatherWidget city="Current Location" onDetailViewEvent={props.onDetailViewEvent} selectedUnit={props.selectedUnit}/>
                {cities.map((city, index) => ( 
                    <WeatherWidget city={city} key={index} onDetailViewEvent={props.onDetailViewEvent} selectedUnit={props.selectedUnit}/>
                ))}
            </div>
        </div>
            );
 }
