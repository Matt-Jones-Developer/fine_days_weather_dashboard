// data widget app

// globals
const searchBtn = document.querySelector('.search-button')
console.log(searchBtn)
const userInput = document.querySelector('#search-input')
console.log(userInput)

let cityName = document.querySelector('.city-name')
let weatherIcon = document.querySelector('.weather-icon')
let description = document.querySelector('.description')
let current = document.querySelector('.current')
let history = document.querySelector('#history')
console.log(history)
let weatherBottom = document.querySelector('.weather-bottom')
let buttonsPane = document.querySelector('.buttons-pane')

const apiKey = '8d752016daf18245563fe658805d4425';

// push to the array every time a city is 'searched' via the 'search-button'
let historyArray = [];

// set moment for todays date 
let today = moment()
console.log(today) // object
let currentDate = moment().format('[Today is] dddd, Do MMMM');
console.log(currentDate)
// append it to element 
let dateTag = document.querySelector('#date');
dateTag.append(currentDate)

// get the time and update it every second

setInterval(function () {

    let today = moment();

    document.querySelector('#time').textContent =
        today.format('[Current time (GMT):] HH:mm:ss')
    // specify every second to update
}, 1000)


// getWeatherForecast()

// async function getWeatherForecast() {
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`);
//     const data = await response.json();

//     console.log(data);
// }


$('#search-button').on('click', function (event) {

    event.preventDefault();

    // grab the text from input box
    let location = $('#search-input').val();

    // push the city to the historyArray
    historyArray.push(location); // .capitalize() ??

    // call renderHistoryButtons
    renderHistoryButtons()

    // by city name (search entry) must be the GEO endpoint; No, mine works!
    // let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${data}&limit=5&appid=${apiKey}&cnt=5`
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&limit=5&appid=${apiKey}`
    console.log(queryURL)

    // fetch from API
    fetch(queryURL)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(typeof (data)) // object

            // convert the object into usable data
            let city = data.city.name; // london!
            console.log(city)
            let country = data.city.country; // london!
            console.log(country) // GB
            let coords = data.city.coord;
            console.log(coords) // coord object array
            let lat = data.city.coord.lat
            let lon = data.city.coord.lon
            console.log(lat, lon)

            // lets stick with vanilla!
            // create
            let cityTitle = document.createElement('h1');
            // let cityCoords = document.createElement('h3');

            // set its content
            cityTitle.textContent = `${city}, ${country}`;
            // cityCoords.textContent = `Lat: ${lat}, Lon: ${lon}`;

            // append the style 
            cityTitle.setAttribute("style", "color: orange", "fontWeight: bolder")

            // put on the page (append)
            cityName.appendChild(cityTitle)
            // current.appendChild(cityCoords)

            // fetch 5-day forecast here
            console.log(data.list[0])
            console.log(data.list[0].dt_txt) // grabs the current day only 

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
                console.log('this days forecast stamp:', forecast)
                let fiveDayIcon = forecast.weather[0].icon;
                console.log('fiveDayIcon fetch:', fiveDayIcon)
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
                temp.classList.add("card-text","pulse");
                // convert that days temperature to Celsius
                // Celsius = (Kelvin – 273.15)
                let forecast5Cels = parseFloat(forecast.main.temp) - 273.15;
                console.log(forecast5Cels.toFixed(0))
                forecast5Temp = forecast5Cels.toFixed(0);
                temp.textContent = `Temperature: ${forecast5Temp} °C`; // kelvin!! needs processing through temp converter function

                // if temp is below 5 - change its colour
                if (forecast5Temp <= 5) {
                    temp.style.color = 'lightblue';
                } else if (forecast5Temp <= 12) {
                    temp.style.color = 'orange';
                } else {
                    temp.style.color = 'red';
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


            // call getWeather
            getCurrentWeather(lat, lon);

            // YOU DO NOT WANT TO NEST THESE - PLACE ALL IN THEIR OWN FUNCTIONS 

            // 

            // getWeather()
            // let temp = data.city.temp;
            // console.log(temp)
            // obvs weather doesn;t exist within this object
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
                        console.log(data["main"]["temp"] + " F");
                        let fah = data["main"]["temp"];
                        console.log('the temp(F): ', fah)

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
                        fahr = fah.toFixed(1); // oddly, not ok??

                        // description

                        let desc = data.weather[0].description;
                        console.log(desc)

                        let cityDescription = document.createElement('h2');
                        cityDescription.textContent = `The forecast for ${city} is ${desc}.`
                        description.appendChild(cityDescription)

                        // feels like 
                        console.log(data["main"]["feels_like"]) // ok
                        let feels = data["main"]["feels_like"]
                        let feelsLike = document.createElement('h4');
                        // feelsLike.textContent = `Feels like ${feels} F`;
                        // convert it to Celsius
                        getFeelsCels = (parseFloat(feels) - 32) * 5 / 9;
                        feelsLikeCels = getFeelsCels.toFixed(0);
                        feelsLike.textContent = `Feels like ${feelsLikeCels} °C`;
                        description.appendChild(feelsLike)

                        // getWeather(lat, lon);
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
                        // append to page 
                        current.append(tempIcon, cityTemp)
                        // current.appendChild(cityTemp)
                        // current.appendChild(cityTempF)

                        // log humidity
                        console.log(data["main"]["humidity"] + '%')
                        let hum = data["main"]["humidity"];
                        let humidity = document.createElement('h4');
                        humidity.textContent = `Current humidity is ${hum}%`
                        // generate google icon
                        humIcon = document.createElement('span')
                        humIcon.classList.add('pulse')
                        humIcon.classList.add('material-symbols-outlined');
                        humIcon.textContent = 'humidity_percentage';
                        current.append(humIcon,humidity)
                        // current.appendChild(humidity)

                        // windspeed
                        console.log(data.wind.speed)
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
                        console.log(mph)
                        let mphFixed = mph.toFixed(2)
                        let windMph = document.createElement('h4');
                        windMph.textContent = `Wind speed is currently ${mphFixed} MPH`
                        current.appendChild(windMph)

                        // icon code

                        console.log(data.weather[0].icon) // grabs icon code for city
                        // let iconCode = data.weather[0].icon;
                        let { icon } = data.weather[0];

                        // let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                        //display icon:
                        // let iconDiv = document.createElement('img');
                        // iconDiv.setAttribute('class', 'weather-icon');
                        // iconDiv.innerHTML = `<img src="${iconImg}">`;
                        // weatherIcon.append(icon)

                        // $('#weather-icon').attr('src', iconUrl);

                        weatherIcon.innerHTML = `
                        <img src="./assets/images/icons/${icon}.png">`;

                        // 5-day forecast from here??

                        // console.log(data.weather[0])
                        // console.log(data.weather[0].dt_txt) // grabs the current day 



                    }
                })
            }


            // if user presses button AGAIN (once values are generated to the page)
            // clear previous
            // if (cityName !== null || '') {

            //     // clear previous search?
            //     $('.viewer').empty(); 
            // } 



            ///
            // let jsonData = JSON.parse(data);

            // pm.letiables.get("city");

            // let weather = jsonData.weather[0].description;
            // // let temp = jsonData.main.temp;
            // // let city = jsonData.name;
            // let date = new Date()
            // //let cleandate = date.slice(0,date.lastIndexOf('T'));

            // pm.environment.set('weather', weather)
            // pm.environment.set('temp', ((temp - 273.15) * (9 / 5) + 32).toFixed(3).replace(/\.(\d\d)\d?$/, '.$1'))
            // pm.environment.set('thecity', city);

            // let rec = pm.environment.get("activity");

            // let yesjacket = "You may need a jacket though.";
            // let nojacket = "";

            // //rec = 'outdoor' &&

            // if (pm.environment.get("temp") < 62) {

            //     pm.environment.set("jacket", yesjacket);
            // }

            // if (pm.environment.get("activity") == "indoor") {
            //     pm.environment.set("jacket", nojacket);
            // }

            // pm.environment.set("test", "5555");

            // console.log(jsonData.name);



        })
})


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


// this should be getWeatherData() TODO
function addToSearchHistory() {
    // declare the city
    let city = $(this).attr('data-name');
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&limit=5&appid=${apiKey}`

    // call the API (OR recall from localStorage PROBABLY)


}

// render new history buttons

function renderHistoryButtons() {

    // delete prior searches?? do we want this here? 
    // not until we set to 'clear history button'
    $('.buttons-pane').empty();

    // loop through array items
    for (let i = 0; i < historyArray.length; i++) {
        // capitalise title
        let btnLabel = historyArray[i];
        // let capBtnLabel = btnLabel.capitalize();
        // console.log(capBtnLabel)
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





