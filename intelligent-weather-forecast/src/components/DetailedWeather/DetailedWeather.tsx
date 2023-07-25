import { faCloudSun, faGlasses, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import { getWeatherData } from '../../utils/weatherData/weatherDataUtils';
import './detailed-weather.scss';
import { Units, units } from './../../constants/units';

interface WeatherData {
    main: {
        temp: number,
        temp_max: number,
        temp_min: number,
        humidity: number,
    },
    timezone: number,
    sys:{
        sunrise: number,
        sunset: number
    },
    name:string,
    visibility: number,
    weather: {
        description: string,
        icon: string
    }[];
}

interface Props {
    city: string;
    weatherData: WeatherData,
    selectedUnit: string
}

export default function DetailedWeather(props: Props) {

    const temperatureUnit = units.temperature[props.selectedUnit as keyof typeof units.temperature];

    const getWeatherIcon = () =>{
        return "https://openweathermap.org/img/wn/"+props.weatherData.weather[0].icon+"@2x.png"
    }

    const convertTimeStampToLocalTimeString = (unixTimestamp: number, timezoneOffset: number) => {
        const date = new Date(unixTimestamp * 1000);
        const localTime = new Date(date.getTime() + timezoneOffset * 1000);
        const hours = localTime.getUTCHours().toString().padStart(2, '0');
        const minutes = localTime.getUTCMinutes().toString().padStart(2, '0');

        const timeString = `${hours}:${minutes}`;

        return timeString;
    }

    return (
        <div className="container">
            <Row className="justify-content-md-center dashboardBlue mainDiv">
                <Col xs lg="12" className="mainTempLocation">
                    <span>{props.weatherData.name}</span>
                </Col>
                <Row className="justify-content-md-center">
                    <Col xs="12" lg="12" className="justify-content-md-center mainTemp">
                        <div>{props.weatherData.main.temp} {temperatureUnit}</div>
                    </Col>
                </Row>
                <div className="weatherDescription">
                    {props.weatherData.weather[0].description}
                    <img src={getWeatherIcon()} />
                </div>
                <Row>
                    <Col xs lg="4"></Col>
                    <Col xs lg="2" className="justify-content-md-center">
                        <div className="temp">
                            H : {props.weatherData.main.temp_max}{temperatureUnit}
                        </div>
                    </Col>
                    <Col xs lg="2" className="justify-content-md-center">
                        <div className="temp">
                            L : {props.weatherData.main.temp_min}{temperatureUnit}
                        </div>
                    </Col>
                </Row>
            </Row>

            <Row className="">
                <Col xs="12" lg="6" className="spaceBoxL">
                    <div className="bgLgBlue arrBox">
                        <div className="weatherTitle">
                            Sunrise <FontAwesomeIcon icon={faSun} />
                        </div>
                        <div>Today's Sunrise</div>
                        <div className="temperature">
                            {convertTimeStampToLocalTimeString(props.weatherData.sys.sunrise, props.weatherData.timezone)}
                        </div>
                    </div>
                </Col>
                <Col xs="12" lg="6" className="spaceBoxR">
                    <div className="bgLgBlue arrBox">
                        <div className="weatherTitle">
                            Sunset <FontAwesomeIcon icon={faSun} />
                        </div>
                        <div>Today's Sunset</div>
                        <div className="temperature">
                            {convertTimeStampToLocalTimeString(props.weatherData.sys.sunset, props.weatherData.timezone)}
                        </div>
                    </div>
                </Col>
            </Row>

            <Row className="justify-content-md-center">
                <Col xs="12" lg="6" className="spaceBoxL">
                    <div className="bgLgBlue arrBox">
                        <div className="weatherTitle">
                            Humidity <FontAwesomeIcon icon={faCloudSun} />
                        </div>
                        <div>Today's Humidity</div>
                        <div className="temperature">
                            {props.weatherData.main.humidity}%
                        </div>
                    </div>
                </Col>
                <Col xs="12" lg="6" className="spaceBoxR">
                    <div className="bgLgBlue arrBox">
                        <div className="weatherTitle">
                            Visibility <FontAwesomeIcon icon={faGlasses} />
                        </div>
                        <div>Today's visibility</div>
                        <div className="temperature">
                            {props.weatherData.visibility}m
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
