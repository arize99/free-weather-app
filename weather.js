<<<<<<< HEAD
// search form, search input, city, humidity, wind, pressure
const weatherSearch = document.querySelector('.weather__search');
const weatherSearchInput = document.querySelector('.weather__searchinput');
const weatherCity = document.querySelector('.weather__city');
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

weatherSearch.addEventListener("submit", function(event) {
    //prevent page refresh on form submission
    event.preventDefault();
    //Validation check to see if input was empty
    if (event.target[0].value != ""){
        getCurrentWeather(event);
    }else{
        errorMessage.innerHTML = "Please input a city name";
        setTimeout(()=> errorMessage.innerHTML = "", 3000);
    }
});

//API call
const getCurrentWeather = (event) => {
    const location = event.target[0].value
    
    //search by city is deprecated but still works
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
    .then((response) => {
        
        console.log("🚀 ~ getCurrentWeather ~ event:", event)
        weatherData = response.data;
        displayWeatherData(weatherData);
    })
    .catch((error) => {
        //show error message
        errorMessage.innerHTML = "Please input a valid city name";
        //clearing out input box
        weatherSearchInput.value= ""
        //Remove error message after 5 seconds
        setTimeout(()=> errorMessage.innerHTML = "", 5000);

    }); //TODO: Expanded Error Handling for failed api calls 
};

const displayWeatherData = (weatherData) => {
    weatherCity.innerHTML = weatherData.name; //name of location
    weatherHumidity.innerHTML = weatherData.main.humidity + " %"; 
    weatherPressure.innerHTML = weatherData.main.pressure + " hPa";
    weatherWind.innerHTML = weatherData.wind.speed + " ms"; // current value is metric/second as oppose to miles per hour
    
    /*Values are pushed in the order they appear in the HTML structure. If the order changes,
    data will be inaccurate as QuerySelectorAll has them in HTML structure order.*/
    tempArr.push(weatherData.main.temp);
    tempArr.push(weatherData.main.temp_min);
    tempArr.push(weatherData.main.temp_max);
    tempArr.push(weatherData.main.feels_like);
    convertTempToF(); //TODO: Need HTML indicator that F is selected by default
}
//Convert Api data from Kelvin to Fahrenheit
const convertTempToF = () =>{
    for (let i = 0; i < allTempElements.length; i++){
        const element = allTempElements[i];
        let convertedTemp = Math.floor((parseInt(tempArr[i]) - 273.15) * 1.8 + 32);
        element.innerHTML = String(convertedTemp) + "°F";
    }
    
}
//Convert Api data from Kelvin to Celsius
const convertTempToC = (temp) =>{
    for (let i = 0; i < allTempElements.length; i++){
        const element = allTempElements[i];
        let convertedTemp = Math.floor((parseInt(tempArr[i]) - 273.15));
        element.innerHTML = String(convertedTemp) + "°C";
    }
}
=======
// File: weather.js
// Author: Jamey Bryce
// Contributor: Arize Nnonyelu
// Purpose: Frontend JS
// for displaying weather

// state
let currCity = "Awka";
let units = "metric";

// Selectors
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector('.weather__forecast');
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax")
let weather__realfeel = document.querySelector('.weather__realfeel');
let weather__humidity = document.querySelector('.weather__humidity');
let weather__wind = document.querySelector('.weather__wind');
let weather__pressure = document.querySelector('.weather__pressure');

// search
document.querySelector(".weather__search").addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform");
    // prevent default action
    e.preventDefault();
    // change current city
    currCity = search.value;
    // get weather forecast 
    getWeather();
    // clear form
    search.value = ""
})

// units
document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if(units !== "metric"){
        // change to metric
        units = "metric"
        // get weather forecast 
        getWeather()
    }
})

document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
    if(units !== "imperial"){
        // change to imperial
        units = "imperial"
        // get weather forecast 
        getWeather()
    }
})

function convertTimeStamp(timestamp, timezone){
     const convertTimezone = timezone / 3600; // convert seconds to hours 

    const date = new Date(timestamp * 1000);
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
    return date.toLocaleString("en-US", options)
   
}

 

// convert country code to name
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

function getWeather(){
    const API_KEY = '64f60853740a1ee3ba20d0fb595c97d5'

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {
    console.log(data)
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
    datetime.innerHTML = convertTimeStamp(data.dt, data.timezone); 
    weather__forecast.innerHTML = `<p>${data.weather[0].main}`
    weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
    weather__icon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
    weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
    weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
    weather__humidity.innerHTML = `${data.main.humidity}%`
    weather__wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}` 
    weather__pressure.innerHTML = `${data.main.pressure} hPa`
})
}

document.body.addEventListener('load', getWeather())
>>>>>>> main
