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
let weatherBottom = document.querySelector('.weather-bottom')
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

// if city not found in openweather api then do not accept entry?

removeBtn.addEventListener('click', function (event) {
    // clear all the buttons, history and storage 
    $('.buttons-pane').empty();
})

// event listener for search button

searchBtn.addEventListener("click", function (event) {

    // prevent default browser behaviour
    event.preventDefault();

    // grab the text from input box
    let location = $('#search-input').val();

    // if user clicks button but no city has been entered (or incorrect)
    if (location === '' || !isNaN(location)) {
        alert('Enter a City please!')
        return;
    }

    if (historyArray > 0) {
        // resetUserInput()
        // empty previous search
        $('.viewer').empty()
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
        // let citySave = $(this).attr('data-name');
        // console.log('saved city:', citySave) // currently undefined ?
        // // let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&limit=5&appid=${apiKey}`

        // // call the API (OR recall from localStorage PROBABLY)

        // save to localStorage

        let $locationId = $(this).parent().parent().attr('data-name');
        console.log('saving the location ID (data-name)?: ', $locationId)

        // grab key/val and save it
        let $searchInput = $('search-input[data-name~="' + event.target.parentElement.dataset.value + '"]').val();
        // console.log(event.target.dataset.value); // undefined 
        console.log($('search-input[data-name~="' + event.target.parentElement.dataset.value + '"]'))
        console.log($searchInput)
        console.log('the value saved was: ' + $searchInput)

        localStorage.setItem($locationId, $searchInput);

        // console.log('key stored:' + $($timeBlocks).attr('id') + ' & value stored: ' + todoEntry)
        console.log('key stored:' + $locationId + ' value stored:' + $searchInput)

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

            // convert the object into usable data
            let city = data.city.name; // london!
            // console.log(city)
            let country = data.city.country; // GB
            // console.log(country) // GB
            let coords = data.city.coord;
            // console.log(coords) // coord object array
            let lat = data.city.coord.lat
            let lon = data.city.coord.lon
            // console.log(lat, lon) // OK

            // if elements are NOT empty - empty them first
            // if (location.value === '') {
            //     $('.viewer').empty()
            //     console.log('history > 0; viewer emptied')
            // }

            // else {

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
            // }


            // catch garbage 
            // if location not found by API ?
            // return instance.get(`?q=${q}&appid=${appid}`).then(/*...*/).catch((error) => console.log('Request failed!'));

            // if (!location) {
            //     alert("Hey you just 404'd! City not found." )
            // }

            // }).fail(() => {
            // alert("City doesn't Exist!!");
            // $(".city-name").val("");
            // $("city").text("");
            // $("description").text("");
            // $("country").text("");
            // // $("#mintemp").html("");
            // // $("#maxtemp").html("");
        })
}

// so how do we access the weather stats required??
function getCurrentWeather(lat, lon) {
    // tap into weather using lat & lon
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
            // (F * by 1.8 (or 9/5) and + 32.)
            // let cel = (parseFloat(fah) - 32) * 5 / 9 + " °C";
            fahToCel(fah)
            // fahrenheit to celsius converter function
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
            cityTempF.textContent = `For you American folk, that's: ${fahr} °F`;
            // generate google icon
            tempIcon = document.createElement('span')
            tempIcon.classList.add('pulse')
            tempIcon.classList.add('material-symbols-outlined');
            tempIcon.textContent = 'thermostat';

            // clear prior values
            current.innerHTML = '';
            // append to page 
            current.append(tempIcon, cityTemp)
            // current.appendChild(cityTemp)
            // current.appendChild(cityTempF)

            // log humidity
            // console.log(data["main"]["humidity"] + '%')
            let hum = data["main"]["humidity"];
            let humidity = document.createElement('h4');
            humidity.textContent = `Current humidity is ${hum}%`

            // generate google icon HUMIDITY

            // IF humidity <= 33% (low icon)
            // else if humidity <= 66% (med icon)
            // else (high humidity icon)

            humIcon = document.createElement('span')
            humIcon.classList.add('pulse')
            humIcon.classList.add('material-symbols-outlined');
            humIcon.textContent = 'humidity_percentage';
            current.append(humIcon, humidity)
            // current.appendChild(humidity)

            // windspeed
            // console.log(data.wind.speed)
            let wind = data.wind.speed;
            let windSpeed = document.createElement('h4');
            windSpeed.textContent = `Wind speed is currently ${wind} KPH`
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

            weatherIcon.innerHTML = `
                                    <img src="./assets/images/icons/${icon}.png">`;

        }
    })
}

function fiveDayForecast(data) {

    // grab the min and max for the day?
    // let tempMin = data.temp_min;
    // let tempMax = data.temp_max;
    // console.log(tempMin, tempMax) // undefined

    // fetch 5-day forecast here
    console.log(data.list[0])
    // console.log(data.list[0].dt_txt) // grabs the current day only 

    const fiveDayTitle = document.createElement("h1");
    fiveDayTitle.style.padding = '1rem';
    fiveDayTitle.textContent = 'Five Day Forecast';
    weatherBottom.prepend(fiveDayTitle);

    const forecastList = data.list;
    const forecast5Container = document.querySelector(".forecast-5");
    forecast5Container.classList.add("d-inline-flex");

    // iterate through every dt time stamp, skipping stamps by 8 each pass

    for (let i = 0; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
        // console.log('this days forecast stamp:', forecast)
        let fiveDayIcon = forecast.weather[0].icon;
        // console.log('fiveDayIcon fetch:', fiveDayIcon)
        const card = document.createElement("div");
        card.classList.add("card", "bg-dark", "m-3", "justify-content-center");
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
        title.textContent = formattedDate;

        const temp = document.createElement("p");
        temp.classList.add("card-text", "pulse");
        // convert that days temperature to Celsius
        // Celsius = (Kelvin – 273.15)
        let forecast5Cels = parseFloat(forecast.main.temp) - 273.15;
        // console.log(forecast5Cels.toFixed(0))
        forecast5Temp = forecast5Cels.toFixed(0);
        temp.textContent = `Temperature: ${forecast5Temp} °C`; // kelvin!! needs processing through temp converter function

        // if temp is below 5 - change its colour
        if (forecast5Temp <= 5) {
            temp.style.color = 'lightblue';
        } else if (forecast5Temp <= 12) {
            temp.style.color = 'orange';
        } else {
            temp.style.color = '#D65745';
        }

        const weather = document.createElement("p");
        weather.classList.add("card-text");
        weather.textContent = `Weather: ${forecast.weather[0].description}`;

        // add image element for the icon
        const icon = document.createElement("img");
        icon.classList.add("card-img-top", "text-center");
        // as an alternative to grabbing the icons from my folder (might swap these out I think)
        icon.src = `https://openweathermap.org/img/wn/${fiveDayIcon}@2x.png`;
        // or via my own image files
        // icon.src =`./assets/images/icons/${fiveDayIcon}.png`; // fail!
        icon.style.width = "100px";
        icon.style.height = "100px";
        icon.style.borderRadius = '1rem';
        icon.style.margin = '2rem auto';

        // if 01n or 10n (sun?) color them orange?
        if (fiveDayIcon) {
            icon.style.backgroundColor = 'orange';
        }

        // why cant we center the icon?? 
        // NOTHING WILL CENTER THESE!! hahahaha
        // icon.style.border = '1px solid red';

        // append elements to the card
        card.appendChild(icon);
        cardBody.appendChild(title);
        cardBody.appendChild(temp);
        cardBody.appendChild(weather);
        card.appendChild(cardBody);
        forecast5Container.appendChild(card);
    }

}





// the buttons! (on click of searchBtn)

// do we have to use local storage to store the entire data for that searched city?\
// or can we simply re-call the api when the button pressed??

// we need them to:

// 1. upon user clicking 'seacrh button'
// create a new button
// assign the city entered to its label (textContent)
// save the cities data to local storage (using key/value) 
// key is the button ID and value is the weather data

// 2. when user clicks that button
// clear the current weather-view div (prior search)
// pull the key/value from local and generate it to the 'weather-view' div
// call the 5-day function to generate that data for the city

// 3. add a remove button (all buttons are PREPENDED above this history button)
// when user clicks 'clear history' -> 
// clear all local storage 
// clear and delete all the buttons 

// render new history buttons

function renderHistoryButtons() {

    // stop duplicates (clear previous)
    $('.buttons-pane').empty();

    // loop through array items
    for (let i = 0; i < historyArray.length; i++) {
        // capitalise title
        let btnLabel = historyArray[i];
        // let capBtnLabel = btnLabel.capitalize();
        console.log('btnLabel has rendered via array: ', btnLabel)
        // generate buttons from array
        let newBtn = document.createElement('button');
        // why do we have to do the Jquery way here~??
        // let newBtn = $('<button>');
        // add a class to it
        // newBtn.addClass('searched-city');
        // make it a bootstrap button
        newBtn.classList.add('btn', 'btn-secondary', 'searched-city');
        // add a data-attribute 
        // newBtn.attr('data-name', historyArray[i]);
        newBtn.setAttribute('data-name', historyArray[i])
        // style it
        // newBtn.attr('style', 'background-color: orange')
        newBtn.style.backgroundColor = 'orange';
        newBtn.style.borderRadius = '1rem';
        newBtn.style.textTransform = 'capitalize';
        // add the city as the button text
        newBtn.textContent = historyArray[i];
        // append the button to the aside
        buttonsPane.appendChild(newBtn) // this is not Jquery
        // $('.buttons-pane').append(newBtn)

    }
}





