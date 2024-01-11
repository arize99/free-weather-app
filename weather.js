// File: weather.js
// Author: Jamey Bryce
// Contributor: Arize Nnonyelu, Samuel Reid
// Purpose: Frontend JS
// for displaying weather

// search form, search input, city, humidity, wind, pressure
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector('.weather__forecast');
let weather__icon = document.querySelector(".weather__icon");
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

//Saving API Weather Data
let weatherData = {}

// api key
const apiKey = "64f60853740a1ee3ba20d0fb595c97d5" //api key here 

//Error Message for error handling 
const errorMessage = document.getElementById("errorMessage")

weatherSearch.addEventListener("submit", function(event) {
    //prevent page refresh on form submission
    event.preventDefault();
    //Validation check to see if input was empty
    if (event.target[0].value != ""){
        getWeather(event);
    }else{
        errorMessage.innerHTML = "Please input a city name";
        setTimeout(()=> errorMessage.innerHTML = "", 3000);
    }
});

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
const convertCountryCode = country =>{
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}


//get location
const getLocation = () => {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
}
//Location success
const geoSuccess = position => {
    
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getCurrentWeather(lon, lat);
}
//Location Failed
const geoFail = position => {
    
    errorMessage.innerHTML = "Couldn't find your location";
    setTimeout(()=> errorMessage.innerHTML = "", 3000);
}

//get unit measurement
const unitChange = location => {
    location === "US" ? units = "imperial" : units = "metric";
} 

//Current user location Api call
const getCurrentWeather = (lon, lat) => {
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`).then(res => res.json())
    .then(res => {
        weatherData = res
        displayWeatherData(res);
    })
    
};

//User Input Api call
const getWeather = event =>{
    const currCity = event.target[0].value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${apiKey}`).then(res => res.json())
    .then(res => {
        weatherData = res
        displayWeatherData(res);
        
    })
}

const displayWeatherData = (res_data) => {
    unitChange(res_data.sys.country)
    weatherCity.innerHTML = `${res_data.name}, ${convertCountryCode(res_data.sys.country)}`;
    datetime.innerHTML = convertTimeStamp(res_data.dt, res_data.timezone);
    weather__forecast.innerHTML = `<p>${res_data.weather[0].main}`
    weather__icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${res_data.weather[0].icon}@4x.png" />`
    weatherHumidity.innerHTML = res_data.main.humidity + " %"; 
    weatherPressure.innerHTML = res_data.main.pressure + " hPa";
    
    
    /*Values are pushed in the order they appear in the HTML structure. If the order changes,
    data will be inaccurate as QuerySelectorAll has them in HTML structure order.*/
    tempArr.push(res_data.main.temp);
    tempArr.push(res_data.main.temp_min);
    tempArr.push(res_data.main.temp_max);
    tempArr.push(res_data.main.feels_like);
    res_data.sys.country === "US" ? convertTempToF()  : convertTempToC();
}
//Convert Api data from Kelvin to Fahrenheit
const convertTempToF = () =>{
    for (let i = 0; i < allTempElements.length; i++){
        const element = allTempElements[i];
        let convertedTemp = Math.floor((parseInt(tempArr[i]) - 273.15) * 1.8 + 32);
        element.innerHTML = String(convertedTemp) + "°F";
    }
    //converting to mph from m/s
    weatherWind.innerHTML = Math.floor(parseInt(weatherData.wind.speed) * 2.237) + " mph";
    
    
}
//Convert Api data from Kelvin to Celsius
const convertTempToC = () =>{
    for (let i = 0; i < allTempElements.length; i++){
        const element = allTempElements[i];
        let convertedTemp = Math.floor((parseInt(tempArr[i]) - 273.15));
        element.innerHTML = String(convertedTemp) + "°C";
    }
    weatherWind.innerHTML = weatherData.wind.speed + " m/s";
}
document.body.addEventListener('load', getLocation())