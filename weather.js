// File: weather.js
// Author: Jamey Bryce
// Purpose: Frontend JS
// for displaying weather

// weather units
const weatherUnits = document.querySelector('.weather__units');
const celsius = document.querySelector('.weather_unit_celsius');
const fahrenheit = document.querySelector('.weather_unit_fahrenheit');

// grab the weather body and children
const weatherBody = document.querySelector('.weather__body');
const weatherIcon = document.querySelector('.weather__icon');
const weatherForecast = document.querySelector('.weather__forecast');
const weatherDatetime = document.querySelector('.weather__datetime');
const weatherTemp = document.querySelector('.weather__temperature');
const weatherMinMax = document.querySelectorAll('.weather__minmax');

// grab the weather info and children
const weatherInfo = document.querySelector('.weather__info');
const weatherCity = document.querySelector('.weather__city');
const weatherCards = document.querySelectorAll('.weather__card');

// humidity, wind, pressure
const weatherHumidity = document.querySelector('.weather__humidity');
const weatherWind = document.querySelector('.weather__wind');
const weatherPressure = document.querySelector('.weather__pressure');

//storing all temperatures that need to be changed from Api Lines 87-90
let tempArr = []

//Added a new class called temps in HTML to all temperatures that will need converting
const allTempElements = document.querySelectorAll('.temps');

// api key
const apiKey = "" //api key here 
//Error Message for error handling 
const errorMessage = document.getElementById("errorMessage")
// the above is a good start,
// but we need to get the data
// from the API and put it in
// the fields we just grabbed.
// I'll push this for now and
// see if anybody wants to get
// a go at the API before I do
// ************************
// TO-DO: pull actual data from OpenWeatherMap API
// and display it on the page


// 
document.getElementById("weather_search").addEventListener("submit", function(event) {
    //prevent page refresh on form submission
    event.preventDefault();
    //
    getCurrentWeather(event.target[0].value);

});

//API call
const getCurrentWeather = (location) => {
    //search by city is deprecated but still works
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
    .then((response) => {
        weatherData = response.data;
        displayWeatherData(weatherData);
    })
    .catch((error) => {
        errorMessage.innerHTML = "Please input a valid city name"
        setTimeout(()=>errorMessage.innerHTML = "", 5000);
    }); //TODO: Expanded Error Handling for typos 
};

const displayWeatherData = (weatherData) => {
    weatherCity.innerHTML = weatherData.name; //name of location
    weatherHumidity.children[0].innerHTML = weatherData.main.humidity; 
    weatherPressure.children[0].innerHTML = weatherData.main.pressure;
    weatherWind.children[0].innerHTML = weatherData.wind.speed; // current value is metric/second as oppose to miles per hour
    
    /*Values are pushed in the order that they appear in the HTML structure. If the order changes,
    data will be inaccurate as QuerySelectorAll has them in HTML structure order.*/
    tempArr.push(weatherData.main.temp);
    tempArr.push(weatherData.main.temp_min);
    tempArr.push(weatherData.main.temp_max);
    tempArr.push(weatherData.main.feels_like);
    convertTempToF(); //TODO: Need HTML indicator that F is selected by default
}

const convertTempToF = () =>{
    for (let i = 0; i < allTempElements.length; i++){
        const element = allTempElements[i];
        let convertedTemp = Math.floor((parseInt(tempArr[i]) - 273.15) * 1.8 + 32);
        element.innerHTML = String(convertedTemp) + "°";
    }
    
}

const convertTempToC = (temp) =>{
    for (let i = 0; i < allTempElements.length; i++){
        const element = allTempElements[i];
        let convertedTemp = Math.floor((parseInt(tempArr[i]) - 273.15));
        element.innerHTML = String(convertedTemp) + "°";
    }
}
