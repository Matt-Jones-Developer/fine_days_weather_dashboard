// location widget app

// globals
const searchBtn = document.querySelector('.search-button')

const userInput = document.querySelector('#search-input')

let cityName = document.querySelector('.city-name')
let weatherIcon = document.querySelector('.weather-icon')
let description = document.querySelector('.description')
let current = document.querySelector('.current')
let history = document.querySelector('#history')
let fiveDayLabel = document.querySelector('.five-day-heading')
let buttonsPane = document.querySelector('.buttons-pane')
let viewerPane = document.querySelector('.viewer')
let data;

const apiKey = '8d752016daf18245563fe658805d4425';

// array to store history
let historyArray = [];
console.log('history array is empty:', historyArray)

// moment day and time 
let today = moment()
console.log(today) // object
let currentDate = moment().format('[Today is] dddd, Do MMMM');
console.log(currentDate)
// append it to element 
let dateTag = document.querySelector('#date');
dateTag.append(currentDate)

setInterval(function () {

    let today = moment();

    document.querySelector('#time').textContent =
        today.format('[Current time (GMT):] HH:mm:ss')
    // specify every second to update
}, 1000)

// search button event listener 

searchBtn.addEventListener("click", function (event) {

    event.preventDefault();

    viewerPane.style.backgroundColor = '#fff';

    // grab the text from input box
    let location = document.querySelector('#search-input').value;
    console.log('proper vanilla location: ', location)

    // if user clicks button but no city has been entered
    if (location === '' || !isNaN(location)) {
        alert('Enter a City please!');
        return;
    }

    // fetch ALL data from a single source
    // pass after data AFTER success 
    fetchData(location).then(data => {
        // call getCity
        getCity(data)

    });

    // // where does this expression go
    // // must add IF city is !== data.cod (200) -> request a retry!
    // if (data.cod === 200) {
    //     // call getCity
    //     getCity(data)
    // } else {
    //     alert("Hey! You just 404'd.  Try again.")
    // }

});

// all my functions 

// fetchData
async function fetchData(location) {

    // set the URL
    let queryURL = `
    https://api.openweathermap.org/data/2.5/forecast?q=${location}&limit=5&appid=${apiKey}`

    // return the fetched URL first
    // now we can access data!
    const response = await fetch(queryURL)
    // await response and assign
    const data = await response.json()
    console.log(data)
    // wrong! this data is undefined - not passing correctly
    // return getCity(data)
    return data;
}

// getCity (name country coords)
function getCity(data) {
    // debug logic
    console.log(data) //undefined

    // define the data
    let city = data.city.name
    console.log('the city location name from data:', city)
    let country = data.city.country; // GB
    console.log('the citys country is:', country)

    // access timezone
    // can we use this to offer a 'local time' using moment
    let timeZone = data.city.timezone;
    console.log('the citys timezone is:', timeZone)

    // access sunrise and sunset
    let sunRise = data.city.sunrise;
    console.log('the citys sunrise is:', sunRise) // unix (use moment!)
    let sunSet = data.city.sunset;
    console.log('the citys sunset is:', sunSet) // unix (use moment!)

    // access city coords for detailed weather fetch
    // let coords = data.city.coord;
    // console.log(coords) // coord object array
    let lat = data.city.coord.lat
    let lon = data.city.coord.lon
    console.log('the countries coords are: ', lat, lon) // OK

    // make lat and lon available in the scope
    // return lat, lon; - not required!

    // call getCurrentWeather call
    getCurrentWeather(data)

}

// obtain detailed weather data
function getCurrentWeather(data) {

    // all access via data.list[0] (which is current dt array)
    // debug
    console.log(data) //undefined
    console.log('current hours weather: ', data.list[0])

    // access temp data.list[0].main.temp
    let temp = data.list[0].main.temp
    console.log('current temp (K?): ', temp) // 281.6 K

    // access tempHigh data.list[0].main.temp_max
    let tempMax = data.list[0].main.temp_max
    console.log('current max temp (K?): ', tempMax) // K

    // access tempLow data.list[0].main.temp_min
    let tempMin = data.list[0].main.temp_min
    console.log('current min temp (K?): ', tempMin) // K

    // access feels_like data.list[0].main.feels_like
    let feelsLike = data.list[0].main.feels_like
    console.log('current feels like temp(K?): ', feelsLike) // K

    // access humidity data.list[0].main.humidity
    let humidity = data.list[0].main.humidity
    console.log('current humidity (%): ', humidity) // %
    // access wind speed data.list[0].wind.speed
    let windSpeed = data.list[0].wind.speed
    console.log('current wind speed (KPH): ', windSpeed) // KPH

    // access description (forecast)
    // data.list[0].weather[0].description
    let description = data.list[0].weather[0].description
    console.log('current forecast desc.(text): ', description) // string

    // access icon
    // data.list[0].weather[0].icon
    let icon = data.list[0].weather[0].icon
    console.log('current weathers icon: ', icon)

}



