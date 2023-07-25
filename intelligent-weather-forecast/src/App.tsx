import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import DetailedWeather from './components/DetailedWeather/DetailedWeather';

function App() {

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('metric');
  const [weatherData, setWeatherData] = useState<any | null>(null);

  const handleCityDetailView = (city: string, weatherData:any) => {
    setSelectedCity(city);
    setWeatherData(weatherData);
    
  }

  const handleUpdateUnit = (unit: string) => {
    setSelectedUnit(unit);    
  }

  const handleBackToHome = () => {
    setSelectedCity("");
    setWeatherData(null);
  }

  return (
    <div className="App">
      <NavBar city={selectedCity} backToHome={handleBackToHome} selectedUnit={selectedUnit} updateUnit={handleUpdateUnit}/>
      {selectedCity.length === 0 && <Home onDetailViewEvent={handleCityDetailView} selectedUnit={selectedUnit} />}
      {selectedCity.length > 0  && <DetailedWeather city={selectedCity} weatherData={weatherData} selectedUnit={selectedUnit}/>}
    </div>
  );
}

export default App;
