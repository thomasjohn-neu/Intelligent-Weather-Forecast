import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import * as geoDataUtils from './../../utils/geoData/geoDataUtils';
import * as weatherDataUtils from './../../utils/weatherData/weatherDataUtils';
import { Units, units } from './../../constants/units';
import './weather-widget.scss';
import { Row, Col } from 'react-bootstrap';


interface Props {
    city: string,
    onDetailViewEvent: (city: string, weatherData:any) => void,
    selectedUnit: string
    }

interface WeatherData {
    main: {
        temp: number,
        temp_max:number,
        temp_min:number
    },
    weather: {
      id:number
    }[],
    name: string
    }
      

export default function  WeatherWidget(props: Props){ 

    const [geoData, setGeoData] = useState([]);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<any | null>(null);
    const [currentLocation, setCurrentLocation] = useState<any | null>(null);
    const temperatureUnit = units.temperature[props.selectedUnit as keyof typeof units.temperature];
    const [weatherGif, setWeatherGif] = useState('/clearSky.gif');

    const handleDetailViewClick = () => {
      props.onDetailViewEvent(props.city, weatherData);
  }

    useEffect(() => {
        getGeoData();
    }, []);

    useEffect(() => {
        console.log("inside second, ",currentLocation)
        if (geoData.length > 0) {
            let cityInfo: any = geoData[0]
            let lat = cityInfo.lat;
            let lon = cityInfo.lon;
            getWeatherData(lat, lon);
        }else if(currentLocation !== null){
          getWeatherData(currentLocation.latitude, currentLocation.longitude);
        }
      }, [geoData, currentLocation, props.selectedUnit]);

    useEffect (() => {
      if (weatherData !== null ){
        let imageUrl =  "/clearSky.gif";
        if(weatherData.weather[0].id > 199 && weatherData.weather[0].id < 300 )
          imageUrl = "/thunder.gif"
        if(weatherData.weather[0].id > 299 && weatherData.weather[0].id < 400 )
        imageUrl = "/drizzle.gif"
        // if(weatherData.weather[0].id > 399 && weatherData.weather[0].id < 500 )
        // imageUrl = "/thunder.gif"
        if(weatherData.weather[0].id > 499 && weatherData.weather[0].id < 600 )
        imageUrl = "/rain.gif"
        if(weatherData.weather[0].id > 599 && weatherData.weather[0].id < 700 )
        imageUrl = "/snow.gif"
        if(weatherData.weather[0].id > 699 && weatherData.weather[0].id <= 800 )
        imageUrl = "/clearSky.gif"
        if(weatherData.weather[0].id >= 801 && weatherData.weather[0].id <= 804 )
        imageUrl = "/cloudy.gif"

        setWeatherGif(imageUrl);
      }
    }, [weatherData])

    const getGeoData = async () => {
        if (props.city === "Current Location") {
          try {
            const position = await getLocation();
            if (position) {
              setCurrentLocation(position.coords);              
            }
          } catch (error) {
            setError("Error while fetching location");
          }
        }
        else{
          geoDataUtils.getGeoData({q:props.city, limit:5}).then((data) => {
            if (data !== null){
              if (data.status >= 200 && data.status < 300) {
                data.json().then((body: never[]) => {
                  setGeoData(body);
                  console.log(body);
                  console.log(geoData);
                });
              }
            }
          else{
            console.log("api failed to return a response")
          }
          });
        }
        
    } 

    const getLocation = () => {
      return new Promise<GeolocationPosition>((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve(position);
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          reject(new Error('Geolocation is not supported by your browser.'));
        }
      });
    };
  

    const getWeatherData = (lat: number, lon:number) => {
        weatherDataUtils.getWeatherData({lat, lon, units:props.selectedUnit}).then((data) => {
          if(data !== null){
            if (data.status >= 200 && data.status < 300) {
              data.json().then((body: WeatherData) => {
                setWeatherData(body);
                console.log(body);
                console.log(weatherData);
                console.log("weatherdata received and updated");
              });
            }
          }else{
            console.log("api failed to return a response");
          }
            
          });
    } 



    return (
      <Col className="cardItem" xs="12" lg="3">
        <div data-testid="current-weather" className="card-main">
          {weatherData ? (
            <div>
              <Card.Img variant="top" src={weatherGif} />
              <Card.Body>
                <Card.Title className='top'>
                  {weatherData?.name}
                </Card.Title>
                <Card.Text>
                  <div>
                    <h1>{weatherData?.main.temp} {temperatureUnit}</h1>
                    <h6>High: {weatherData?.main.temp_max} {temperatureUnit} Low: {weatherData?.main.temp_min} {temperatureUnit}</h6>
                  </div>
                </Card.Text>
                <Button variant="primary" onClick={handleDetailViewClick}>Details</Button>
              </Card.Body>
            </div>
          ) : (
            
            <Card.Body className="card-body">
              <Card.Img variant="top" src="/loader.gif" />
              <Card.Title>Loading...</Card.Title>
            </Card.Body>
          )}
        </div>
      </Col>
    );
 }
