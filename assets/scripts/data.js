// location widget app

// temp global searchBtn - may move this to more logical file
const searchBtn = document.querySelector('.search-button')
const userInput = document.querySelector('#search-input')
// for viewer colour change request
let viewerPane = document.querySelector('.viewer')

// global for city location
// as saveToLocal cannot find it
// let location;

// all data functions and API fetching

const apiKey = '8d752016daf18245563fe658805d4425';

// array to store history - again where is the best location for this?
let searchHistory = [];
console.log('history array is empty:', searchHistory)


// call the dateTime 
getDateTime()

// function - set date and time 
function getDateTime() {
    // set moment for todays date 
    let today = moment()
    console.log(today) // object
    // format date
    let currentDate = moment().format('[Today is] dddd, Do MMMM');
    console.log(currentDate)
    // append it to element 
    let dateTag = document.querySelector('#date');
    dateTag.append(currentDate)

    // get the time and update it every second
    setInterval(function () {
        // how can this be improved? (shadowing?)
        let today = moment();
        // set time 
        document.querySelector('#time').textContent =
            today.format('[Current time (GMT):] HH:mm:ss')
        // update every second
    }, 1000)
}

// all event handlers (new script?) or within the renderHistoryButtons()

// on-load handler - grab the items and buttons from local?
// how will we get the buttons??
// on-load event handler?
window.onload = function () {
    // if local has locations 
    if (localStorage.getItem("search-history")) {
        // grab them 
        searchHistory = JSON.parse(localStorage.getItem("search-history"));
        console.log('saved locations found:', searchHistory) // ok

        // generate the button(s) for the saved cities
        renderHistoryButtons()

    }
}

// search button event listener 
searchBtn.addEventListener("click", function (event) {

    // prevent default
    event.preventDefault();

    // grab text from input box
    let location = document.querySelector('#search-input').value;
    console.log('city/location: ', location)



    // if user clicks button but no city entered - catch
    if (location === '' || !isNaN(location)) {
        alert('Enter a City please!');
        return;

    } else {
        // set pane colour
        viewerPane.style.backgroundColor = '#fff';
    }

    // push the city to the searchHistory

    // should this be INSIDE saveCityToLocal()
    searchHistory.push(location);
    console.log('history array has value(s):', searchHistory)

    // set new item to local 
    localStorage.setItem('search-history', JSON.stringify(searchHistory));

    // clear the search bar
    document.querySelector('.weather-search').focus();
    userInput.innerHTML = '';

    // fetch ALL data from a single source
    // get location data AFTER success 
    fetchData(location).then(data => {

        // first point for 'data' access 
        // ... yet this simple if else is doing the OPPOSITE of logic (why??)
        // garbage collector
        if (data.cod != 200) {
            alert("you just 404'd! Try again...")
            // if I reverse it, it kind of works, 
            // but the renderButton() STILL happens on next search?? (the garbage input)

        } else {

            // call getCity
            getCity(data)

            // generate all elements
            generateElements(data)

            // call 5-day
            generateFiveDayElements(data)

            // call renderHistoryButtons
            renderHistoryButtons()

        }

    });

});

// generated locations event listener 



// all data functions 

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
    // data is undefined - not passing correctly
    // return getCity(data)
    // thats the one!
    return data;
}

// getCity (name country coords)
function getCity(data) {
    // debug logic
    console.log(data) //undefined

    // define the data
    let cityData = data.city.name
    console.log('the city location name from data:', cityData)
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

    // access city coords
    let lat = data.city.coord.lat
    let lon = data.city.coord.lon
    console.log('the countries coords are: ', lat, lon) // OK

    // make lat and lon available in the scope
    // return lat, lon; - not required!

    // call getCurrentWeather call
    getCurrentWeather(data)

    // call the 5-day function
    fiveDayForecast(data)

    // save to storage (adding the data as input args)
    // saveCityToLocal(cityData, country)

}

// obtain detailed weather data
function getCurrentWeather(data) {

    // all access via data.list[0] (which is current dt array)
    // debug
    console.log(data) //undefined
    console.log('current hours weather: ', data.list[0])

    // access temp data.list[0].main.temp
    let temp = data.list[0].main.temp;
    console.log('current temp (K?): ', temp) // 281.6 K

    // convert to fahrenheit
    let fahr = kelToFah(temp);
    console.log('temp in fahrenheit: ', fahr)

    // convert to celsius 
    let cels = kelToCel(temp);
    console.log('temp in celsius: ', cels)

    // access tempHigh data.list[0].main.temp_max
    let tempMax = data.list[0].main.temp_max;
    console.log('current max temp (K?): ', tempMax) // K
    // convert to celsius
    let maxCels = kelToCel(tempMax);
    console.log('max_temp in celsius: ', maxCels)

    // access tempLow data.list[0].main.temp_min
    let tempMin = data.list[0].main.temp_min;
    console.log('current min temp (K?): ', tempMin) // K
    // convert to celsius
    let minCels = kelToCel(tempMin);
    console.log('min_temp in celsius: ', minCels)

    // access feels_like data.list[0].main.feels_like
    let feelsLike = data.list[0].main.feels_like;
    console.log('current feels like temp(K?): ', feelsLike) // K
    // convert to celsius
    let feelsCels = kelToCel(feelsLike);
    console.log('feels like in celsius: ', feelsCels)

    // access humidity data.list[0].main.humidity
    let humidity = data.list[0].main.humidity;
    console.log('current humidity (%): ', humidity) // %

    // access wind speed data.list[0].wind.speed
    let windSpeed = data.list[0].wind.speed
    console.log('current wind speed (KPH): ', windSpeed) // KPH
    // convert to MPH
    let windMph = kphToMph(windSpeed);
    console.log('wind speed in MPH: ', windMph)

    // access description (forecast)
    // data.list[0].weather[0].description
    let description = data.list[0].weather[0].description
    console.log('current forecast desc.(text): ', description) // string

    // access icon
    // data.list[0].weather[0].icon
    let icon = data.list[0].weather[0].icon
    console.log('current weathers icon: ', icon)

}

// 5-day weather report function

function fiveDayForecast(data) {

    // fetch data for current day
    // same issue again - it's not calling/reading currently
    console.log('Hello! I can read you "data"!', data.list[0])

    // define the entire list array
    const forecastList = data.list;
    console.log(forecastList)

    // index each card
    let num = 0;
    // iterate through each stamp, skipping every 8
    for (let i = 7; i < forecastList.length; i += 8) {

        // increase data-index by 1
        num = ++num;
        // define each forecast item 
        const forecast = forecastList[i];
        console.log('this days forecast stamp:', forecast)

        // define date
        let fiveDayDate = forecast.dt_txt;
        console.log('FDDate:', fiveDayDate)
        // format dt_txt date via moment 
        let formattedDate = moment(fiveDayDate).format('dddd Do MMMM');
        console.log('formatted date:', formattedDate)
        // define temp
        let fiveDayTemp = forecast.main.temp;
        console.log('5-day temp:', fiveDayTemp)
        // converted to Celsius
        let cels = kelToCel(fiveDayTemp);
        console.log('temp in celsius: ', cels)
        // define icon 
        let fiveDayIcon = forecast.weather[0].icon;
        console.log('5-day icon:', fiveDayIcon)
        // define the description
        let fiveDayDescription = forecast.weather[0].description;
        console.log('day(x) 5-day description: ', fiveDayDescription)
        // grab icon code
        let icon = `https://openweathermap.org/img/wn/${fiveDayIcon}@2x.png`;
        console.log('icon code:', icon)
        // define humidity
        let fiveDayHum = forecast.main.humidity;
        console.log('5-day humidity:', fiveDayHum)
        // can add more definitions if we please ...
    }

}

// conversion functions 

// kelvin to Fahrenheit
function kelToFah(temp) {
    // equation
    let fah = 1.8 * (parseFloat(temp) - 273) + 32;
    // fix decimals
    let fahFixed = fah.toFixed(0);

    return fahFixed;
}

// Kelvin to Celsius
function kelToCel(temp) {
    // equation
    let cel = parseFloat(temp) - 273.15;
    // fix decimals
    let celFixed = cel.toFixed(0);

    return celFixed;
}

// Fahrenheit to Celsius 
function fahToCel(fah) {
    // equation
    getCels = (parseFloat(fah) - 32) * 5 / 9;
    // fix decimals 
    cels = getCels.toFixed(0); // OK

    return cels;
}

// KPH to MPH
function kphToMph(wind) {
    // equation
    let mph = parseFloat(wind) / 1.609344;
    // fix decimals
    let mphFixed = mph.toFixed(2); // OK

    return mphFixed;
}
