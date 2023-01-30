// data widget app

getDateTime()

// globals

const searchBtn = document.querySelector('.search-button')
// console.log(searchBtn)

const userInput = document.querySelector('#search-input')
// console.log(userInput)

const removeBtn = document.querySelector('#remove-btn')

let cityName = document.querySelector('.city-name')
let weatherIcon = document.querySelector('.weather-icon')
let description = document.querySelector('.description')
let current = document.querySelector('.current')
let history = document.querySelector('#history')
let fiveDayLabel = document.querySelector('.five-day-heading')
let buttonsPane = document.querySelector('.buttons-pane')
let viewerPane = document.querySelector('.viewer')

const resetViewer = () => viewerPane.setContent = '';

const apiKey = '8d752016daf18245563fe658805d4425';

// array to store history
let historyArray = [];
console.log('history array is empty:', historyArray)

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


// required functions - remember to RETURN at the front

//[DONE] fetchData(data API) - creates an object of each data into readable
// fetchWeatherForecast() OR split into 2:
// [DONE] fetchCurrentWeather() - includes the API fetch (if required?)
// [DONE] fetchFiveDayForecast() - includes the other API fetch
// [DONE?] renderElements()
// [DONE] clearHistory()
// saveToLocal()
// retrieveFromLocal()
// [DONE] dataConversions:
// kelvinFah()
// fahCelsius()
// kphMph()
// extras:
// dayHighLow()
// fetchLocalTime()
// mini functions for conditionals (where required):
// checkHumidity()
// checkTemp()

// on-load or refresh grab out of local
// this needs to be an array
// let storedLocationData = localStorage.getItem('locations');
// locationData.JSON.parse(storedLocationData)

// console.log(locationData)

// if city not found in openweather api then do not accept entry?

removeBtn.addEventListener('click', function (event) {
    // clear all the buttons, history and storage 
    $('.buttons-pane').empty();
    // clear the array
    historyArray = [];
    console.log('history array is now cleared:', historyArray)
})

// event listener for search button

searchBtn.addEventListener("click", function (event) {

    // prevent default browser behaviour
    event.preventDefault();

    // set viewer to light
    viewerPane.style.backgroundColor = '#fff';

    // grab the text from input box
    let location = $('#search-input').val();

    // if user clicks button but no city has been entered (or incorrect)
    if (location === '' || !isNaN(location)) {
        alert('Enter a City please!')
        return;
    }

    // this does nought
    if (historyArray > 0) {
        resetViewer()
        // empty previous search
        // $('.viewer').empty()
        console.log('history > 0; viewer emptied')

    }

    // push the city to the historyArray
    historyArray.push(location); // .capitalize() ??
    console.log('history array has value(s):', historyArray)

    // call renderHistoryButtons
    renderHistoryButtons()

    // required? better?
    fetchData(location)

    // else {
    //     // it has a value, so clear it ?
    //     // resetViewer()
    //     // console.log('the viewer forecast items were removed.', cityName)
    //     // push the city to the historyArray
    //     historyArray.push(location); // .capitalize() ??
    //     console.log('history array has value(s):', historyArray)

    //     // call renderHistoryButtons
    //     renderHistoryButtons()

    //     // required? better?
    //     fetchData(location)


    // // compare if an array is empty
    // if (historyArray === undefined || historyArray.length == 0) {




    //     // does the if else need to be here instead?



    // }

    // store to local
    // save to history
    addToSearchHistory()

    // this should be within getWeatherData() why?
    function addToSearchHistory() {
        // declare the city
        let citySave = $('#search-input').val();
        console.log('city saved:', citySave) // london

        // why do this individually?  We want each location saved as an object!
        // let locationData = {
        //     city: cityTitle,
        //     country: country,
        //     description: desc,
        //     temp: temp,
        //     humidity: hum,
        //     wind: windMph
        // }

        // console.log('locationData for local:', locationData)

        // save to localStorage

        // // grab key/val and save it
        // let $searchInput = $('search-input[data-name~="' + event.target.parentElement.dataset.value + '"]').val();
        // // console.log(event.target.dataset.value); // undefined 
        // console.log($('search-input[data-name~="' + event.target.parentElement.dataset.value + '"]'))
        // console.log('searchInput saved (key/value?):', $searchInput)
        // console.log('the value saved was: ' + $searchInput)

        // localStorage.setItem(citySave, $searchInput);

        // // console.log('key stored:' + $($timeBlocks).attr('id') + ' & value stored: ' + todoEntry)
        // console.log('key stored:' + citySave + ' value stored:' + $searchInput)

    }


    // } else {
    //     console.log('historyArray contains:', historyArray)
    //     console.log('already contains a value!')
    //     // clear viewer
    //     // $('#forecast').empty();
    //     // alert('viewer emptied.')
    //     console.log('Values now cleared')
    //     fetchData(location)
    // }
})

// // fetch from API
function fetchData(location) {

    // by city name (search entry) must be the GEO endpoint; No, mine works!
    // let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${data}&limit=5&appid=${apiKey}&cnt=5`
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&limit=5&appid=${apiKey}`
    // console.log(queryURL)

    // try to catch unknown city entry??
    // try {
    //     const response = instance.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&limit=5&appid=${apiKey}`);
    // } catch (error) {
    //     console.log('Request failed!');
    //     alert("Hey you just 404'd! City not found.");
    // }

    // try except for if location is not found in openweather api then alert user?


    // fetch from API
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // console.log(typeof (data)) // object

            // catch 404 errors
            // why does this break my code??
            // if (data.cod === 200) {
            // convert the object into usable data
            let city = data.city.name; // london!
            // console.log(city)
            let country = data.city.country; // GB
            // console.log(country) // GB
            // let coords = data.city.coord;
            // console.log(coords) // coord object array
            let lat = data.city.coord.lat
            let lon = data.city.coord.lon
            // console.log(lat, lon) // OK

            // create
            let cityTitle = document.createElement('h1');
            // let cityCoords = document.createElement('h3');

            // clear prior values
            cityName.innerHTML = '';

            // set its content
            cityTitle.textContent = `${city}, ${country}`;
            // cityCoords.textContent = `Lat: ${lat}, Lon: ${lon}`;

            // set data-name 
            cityTitle.setAttribute('data-name', location)
            console.log('cityTitle data- added:', cityTitle.getAttribute('data-name'))

            // append the style 
            cityTitle.setAttribute("style", "color: orange", "fontWeight: bolder")

            // put on the page (append)
            cityName.appendChild(cityTitle)
            // current.appendChild(cityCoords)

            // call getWeather
            getCurrentWeather(lat, lon);

            // 5-day forecast from here??
            fiveDayForecast(data)

            // call save to storage function
            // addToSearchHistory()
            // }

            // else {
            //     // catchError()
            //     alert("you just 404'd! Try again...")
            //     return;
            // }

            // create object for storage

            // let locationData = {
            //     city: cityTitle,
            //     country: country,
            //     description: desc,
            //     temp: temp,
            //     humidity: hum,
            //     wind: windMph
            // }

            // console.log('locationData for local:', locationData)

        })
}

function catchError(location) {
    alert("you just 404'd! Try again...")
    fetchData(location)
}

// so how do we access the weather stats required??
function getCurrentWeather(lat, lon) {
    // tap into weather using lat & lon
    // I cannot use fetch here - it breaks everything!!
    // fetch(queryURL)
    // .then(response => response.json())
    // .then(data => {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        data: {
            lat: lat,
            lon: lon,
            units: 'imperial',
            APPID: apiKey
        },
        success: data => {
            // console.log(data["main"]["temp"] + " F");
            let fah = data["main"]["temp"];
            // console.log('the temp(F): ', fah)

            // convert to Celsius 
            fahToCel(fah)
            function fahToCel(fah) {
                getCels = (parseFloat(fah) - 32) * 5 / 9;
                return getCels;
            }

            // fix decimals 
            cels = getCels.toFixed(0); // OK
            fahr = fah.toFixed(1); // oddly, not ok

            // city 
            let city = data.name; // london!
            // console.log(city)

            // description
            let desc = data.weather[0].description;
            // console.log(desc)

            // clear prior values
            description.innerHTML = '';

            let cityDescription = document.createElement('h2');
            cityDescription.textContent = `The forecast for ${city} is ${desc}.`
            description.appendChild(cityDescription)

            // feels like 
            // console.log(data["main"]["feels_like"]) // ok
            let feels = data["main"]["feels_like"]
            let feelsLike = document.createElement('h4');
            // for future button toggle
            // feelsLike.textContent = `Feels like ${feels} F`;
            // convert it to Celsius
            getFeelsCels = (parseFloat(feels) - 32) * 5 / 9;
            feelsLikeCels = getFeelsCels.toFixed(0);
            feelsLike.textContent = `Feels like ${feelsLikeCels} °C`;
            feelsLike.style.paddingBottom = '.2rem';
            description.appendChild(feelsLike)

            // add and append it below 
            let cityTemp = document.createElement('h3');
            cityTemp.textContent = `The current temperature is: ${cels} °C`;
            // for American folks!
            // TODO: offer a switch toggle here to select which gets displayed
            let cityTempF = document.createElement('h3');
            cityTempF.textContent = `For you American folks, that's: ${fahr} °F`;
            // generate google icon
            tempIcon = document.createElement('span')
            tempIcon.classList.add('pulse')
            tempIcon.classList.add('material-symbols-outlined');
            tempIcon.textContent = 'thermostat';

            // clear prior values
            current.innerHTML = '';
            // append to page 
            current.append(tempIcon, cityTemp, cityTempF)

            // log humidity
            // console.log(data["main"]["humidity"] + '%')
            let hum = data["main"]["humidity"];
            let humidity = document.createElement('h4');
            humidity.textContent = `Current humidity is ${hum}%`

            // generate google icon HUMIDITY [todo]

            // IF humidity <= 33% (low icon)
            // else if humidity <= 66% (med icon)
            // else (high humidity icon)

            humIcon = document.createElement('span')
            humIcon.classList.add('pulse')
            humIcon.classList.add('material-symbols-outlined');
            humIcon.textContent = 'humidity_percentage';
            current.append(humIcon, humidity)

            // windspeed
            // console.log(data.wind.speed)
            let wind = data.wind.speed;
            let windSpeed = document.createElement('h4');
            windSpeed.textContent = `Wind speed is currently ${wind} KPH`
            // for future toggle update
            // current.appendChild(windSpeed)

            // google air icon
            airIcon = document.createElement('span')
            airIcon.classList.add('pulse')
            airIcon.classList.add('material-symbols-outlined');
            airIcon.textContent = 'air';
            current.appendChild(airIcon)
            // get MPH: KPH / 1.609344 = MPH
            let mph = parseFloat(wind) / 1.609344
            // console.log(mph)
            let mphFixed = mph.toFixed(2)
            let windMph = document.createElement('h4');
            windMph.textContent = `Wind speed is currently ${mphFixed} MPH`
            current.appendChild(windMph)

            // icon code
            // console.log(data.weather[0].icon) // grabs icon code for city
            // let iconCode = data.weather[0].icon;
            let { icon } = data.weather[0];

            weatherIcon.innerHTML = `<img src="./assets/images/icons/${icon}.png">`;

            // create the data object for storage 
            let locationData = {
                city: city,
                description: desc,
                temp: cels,
                humidity: hum,
                wind: mphFixed
            }
            // empty array to store each location
            let locations = [];
            // if local has locations 
            if (localStorage.getItem("locations")) {
                // grab them 
                locations = JSON.parse(localStorage.getItem("locations"));
            }
            // add a new data-index to each saved location and ++ (must be +1??)
            locationData.dataIndex = locations.length + 1;
            // push new object to array
            locations.push(locationData);
            // set it to local
            localStorage.setItem("locations", JSON.stringify(locations));
            // debug
            console.log('locationData for local:', locationData) // OK

            // // send to local - fine, but will overwrite each time 
            // localStorage.setItem("location", JSON.stringify(locationData));
        }
    })
}

function fiveDayForecast(data) {

    // fetch 5-day forecast here
    console.log(data.list[0])
    // console.log(data.list[0].dt_txt) // grabs the current day only 

    const fiveDayTitle = document.createElement("h1");
    fiveDayTitle.style.padding = '1rem';
    // clear prior values
    fiveDayLabel.innerHTML = '';
    fiveDayTitle.textContent = 'Five Day Forecast';
    fiveDayLabel.prepend(fiveDayTitle);

    const forecastList = data.list;
    // grab the min and max for the day [todo]
    // let tempMin = forecastList.main.temp_min;
    // let tempMax = forecastList.main.temp_max;
    // console.log(tempMin, tempMax) // undefined
    const forecast5Container = document.querySelector(".forecast-5");
    forecast5Container.classList.add("d-inline-flex");

    // iterate through every dt time stamp, skipping stamps by 8 each pass
    // clear prior values
    forecast5Container.innerHTML = '';
    // index each card
    let num = 0;
    // iterate through each stamp, skipping every 8
    for (let i = 7; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        // console.log('this days forecast stamp:', forecast)
        let fiveDayIcon = forecast.weather[0].icon;
        // console.log('fiveDayIcon fetch:', fiveDayIcon)
        const card = document.createElement("div");
        card.classList.add("card", "bg-dark", "m-3", "justify-content-center");
        // increase data-index by 1
        num = ++num;
        // console.log(num);
        card.setAttribute('data-index', num);
        card.style.padding = '1rem';

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h4");
        title.classList.add("card-title");
        // convert dt_txt via moment 
        let fiveDayDate = forecast.dt_txt
        // let formattedDate = fiveDayDate.format('Do MM')
        let formattedDate = moment(fiveDayDate).format('dddd Do MMMM');
        // title.textContent = forecast.dt_txt; // must be formatted using moment
        title.innerHTML = '';
        title.textContent = formattedDate;

        const temp = document.createElement("p");
        temp.classList.add("card-text", "pulse");
        // convert that days temperature to Celsius
        // Celsius = (Kelvin – 273.15)
        let forecast5Cels = parseFloat(forecast.main.temp) - 273.15;
        // console.log(forecast5Cels.toFixed(0))
        forecast5Temp = forecast5Cels.toFixed(0);
        temp.innerHTML = '';
        temp.textContent = `Temperature: ${forecast5Temp} °C`; // kelvin!! needs processing through temp converter function

        // if temp is below 5 - change its colour
        if (forecast5Temp <= 5) {
            temp.style.color = 'lightblue';
        } else if (forecast5Temp <= 12) {
            temp.style.color = 'orange';
        } else {
            // it's warm!
            temp.style.color = '#D65745';
        }
        // get weather description
        const weather = document.createElement("p");
        weather.classList.add("card-text");
        weather.innerHTML = '';
        weather.textContent = `Weather: ${forecast.weather[0].description}`;

        // add image element for the icon
        const icon = document.createElement("img");
        icon.classList.add("card-img-top", "text-center");
        // as an alternative to grabbing the icons from my folder
        icon.src = `https://openweathermap.org/img/wn/${fiveDayIcon}@2x.png`;
        // style icons
        icon.style.width = "100px";
        icon.style.height = "100px";
        icon.style.borderRadius = '1rem';
        icon.style.margin = '2rem auto';
        icon.style.backgroundColor = 'orange';

        // clear the cards
        card.innerHTML = '';
        cardBody.innerHTML = '';
        // append elements to the card
        // icon to card 
        card.appendChild(icon);
        // title, temp and weather to body
        cardBody.append(title, temp, weather);
        // cardBody to card 
        card.appendChild(cardBody);
        // card to the container 
        forecast5Container.appendChild(card);
    }

}


// render new history buttons

function renderHistoryButtons() {

    // stop duplicates (clear previous)
    $('.buttons-pane').empty();
    // re-show from remove function
    // buttonsPane.style.display = "block"; - nope!
    let count = 0;
    // loop through array items
    for (let i = 0; i < historyArray.length; i++) {
        // assign item to btn
        let btnLabel = historyArray[i];
        count++;
        // let capBtnLabel = btnLabel.capitalize();
        console.log('btnLabel has rendered via array: ', btnLabel)
        // generate buttons from array
        let newBtn = document.createElement('button');
        //add classes
        newBtn.classList.add('btn', 'btn-secondary', 'searched-city');
        // add a data-attribute 
        newBtn.setAttribute('data-name', historyArray[i])

        // style buttons
        newBtn.style.backgroundColor = 'orange';
        newBtn.style.borderRadius = '1rem';
        newBtn.style.textTransform = 'capitalize';
        newBtn.style.width = '8rem';
        // add the city as the button text
        newBtn.textContent = historyArray[i];
        // append the button to the aside
        buttonsPane.appendChild(newBtn)

    }
    // why won't this persist??
    if (count > 5) {
        let counterAlert = document.createElement('h3');
        counterAlert.innerHTML = "\nWoah! How many cities yer visiting there?\nWe about to make this UI look well ugly!"
        current.appendChild(counterAlert)
    }
}





