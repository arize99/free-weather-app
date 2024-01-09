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
const weatherMinMax = document.querySelector('.weather__minmax');

// grab the weather info and children
const weatherInfo = document.querySelector('.weather__info');
const weatherCity = document.querySelectorAll('.weather__city');
const weatherCards = document.querySelectorAll('.weather__card');

// humidity, wind, pressure
const weatherHumidity = document.querySelector('.weather__humidity');
const weatherWind = document.querySelector('.weather__wind');
const weatherPressure = document.querySelector('.weather__pressure');

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
