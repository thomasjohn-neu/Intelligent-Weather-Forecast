# Intelligent Weather Portal

Web front-end of a new,
intelligent weather Forecasting service.

## Tech Stack
* React 18.2.0
* Typescript 4.9.5

## Steps to run
* Clone the repsoitory using `git clone git@github.com:thomasjohn-neu/Intelligent-Weather-Forecast.git`
* From the folder `intelligent-weather-forecast`, run `npm install` to download dependencies
* Run `npm start` and open url `localhost:3000` from your browser
* Run `npm test` to execute the unit tests

## Third Party API used
* https://openweathermap.org/
        
    Uses the Geo Location API services and current weather API for updated weather information

    ### API Used
    * https://api.openweathermap.org/data/2.5/weather?q=London
    * https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

## Features

* By default displays the weather of current location, Berlin and London
* The app dynamically supports multiple locations, to add more locations, add cities inside the array at `intelligent-weather-forecast/src/constants/cities.ts`
* The weather widgets displays dynamic images and icons based on the current weather
* Supports `Metric`, `Imperial`, `Standard` Unit Conventions which can be changed from the dashboard using the dropdown available at Navigation Bar
* Detailed page shows `Sunrise`, `Sunset`, `Humidity`, `Visibility`, `High`, `Low` and related `climate description`


## Thought Process while developing

* ## Component structuring
    Tried to make small components for Dashboard, City based widgets for dashboard, and detailed view, so app can scale for more cities and more felxibility to add new routes and new features

* ## React Architecture
Tried to use standard react library folder structuring and code modules to seperate the render logic, control logic and configurations
* `src/components` - for all components and corresponding style files
* `src/constants` - for third party API URL configs, constants and static configurations and other constants like units for statndard, metric, imperial mapping
* `src/utils` - for reusable utility functions, functions for request api calls, javascript fetch calls, more REST methods can be added in similar fashion to avoid code complexity in components. This utils also have API specific utils for URL configurations and query parameter extensions

* ## Others

Used standard react library for routing to support new url template routings, react-bootstrap for responsive design 



## CORS bypassing
To avoid CORS error, API call to the openweathermap is getting redirected from https://thingproxy.freeboard.io/fetch/


## APP Token
To use your own APP ID for openweathermap, update the `APP_ID` under `intelligent-weather-forecast/src/constants/apiConstants.ts`

## Component Hierarchy
    App - 
        NavBar -
            DropDown 
        Home - 
            WeatherWidget(1 for current city, rest based on the cites added to the config array)
        DetailedWeather - Switches Home or DetailedWeather if city is selected or vice-versa

## Screenshots

* Dashboard
  ![Dashboard](screenshots/Dashboard.png)

* Dashboard - Imperial Units
  ![Dashboard](screenshots/DasboardImperial.png)

* Detailed Weather View
  ![Dashboard](screenshots/DetailedView.png)









