// search form, city, humidity, wind, pressure
const weatherSearch = document.querySelector('.weather__search');
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
    //calling api function with user input location
    getCurrentWeather(event.target[0].value);

});

//API call
const getCurrentWeather = (location) => {
    //search by city is deprecated but still works
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
    .then((response) => {
        weatherData = response.data;
        console.log("🚀 ~ .then ~ weatherData:", weatherData)
        displayWeatherData(weatherData);
    })
    .catch((error) => {
        errorMessage.innerHTML = "Please input a valid city name";
        setTimeout(()=>errorMessage.innerHTML = "", 5000);
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
        element.innerHTML = String(convertedTemp) + "°";
    }
    
}
//Convert Api data from Kelvin to Celsius
const convertTempToC = (temp) =>{
    for (let i = 0; i < allTempElements.length; i++){
        const element = allTempElements[i];
        let convertedTemp = Math.floor((parseInt(tempArr[i]) - 273.15));
        element.innerHTML = String(convertedTemp) + "°";
    }
}
