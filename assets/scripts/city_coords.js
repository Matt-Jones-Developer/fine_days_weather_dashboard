// globals
const searchBtn = document.querySelector('.search-button')
const userInput = document.querySelector('#search-input')

let cityName = document.querySelector('.city-name')
let weatherIcon = document.querySelector('.weather-icon')
let description = document.querySelector('.description')
let current = document.querySelector('.current')
let history = document.querySelector('#history')
let weatherBottom = document.querySelector('.weather-bottom')
let buttonsPane = document.querySelector('.buttons-pane')

const apiKey = '8d752016daf18245563fe658805d4425';

let historyArray = [];

searchBtn.addEventListener("click", function (event) {
    //     $('#search-button').on('click', function (event) {

    // compare if an array is empty
    if (historyArray === undefined || historyArray.length == 0) {

        console.log('historyArray is empty:', historyArray)
    } else {
        console.log('historyArray contains:', historyArray)
    }

    // prevent default browser behaviour
    event.preventDefault();

    // clear viewer
    // $('#forecast').empty();

    // grab the text from input box
    let location = $('#search-input').val();

    // push the city to the historyArray
    historyArray.push(location);
    console.log(historyArray)

    // call renderHistoryButtons
    // renderHistoryButtons()

    // test the fetchData()
    fetchData(location)

})
// // fetch from API
function fetchData(location) {

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
            let country = data.city.country; // GB
            console.log(country) // GB
            let coords = data.city.coord;
            console.log(coords) // coord object array
            let lat = data.city.coord.lat
            let lon = data.city.coord.lon
            console.log(lat, lon) // OK

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

            // call getWeather
            getCurrentWeather(lat, lon);

            // 5-day forecast from here??
            fiveDayForecast(data)

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
            fahr = fah.toFixed(1); // oddly, not ok

            // city 

            let city = data.name; // london!
            console.log(city)

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
            // append to page 
            current.append(tempIcon, cityTemp)
            // current.appendChild(cityTemp)
            // current.appendChild(cityTempF)

            // log humidity
            console.log(data["main"]["humidity"] + '%')
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

            weatherIcon.innerHTML = `
                                    <img src="./assets/images/icons/${icon}.png">`;

        }
    })
}

function fiveDayForecast(data) {

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
        temp.classList.add("card-text", "pulse");
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




// fetch(queryURL)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         console.log(typeof (data)) // object

//     })

        // fetchData()

        // function fetchData() {
        //     // by city name (search entry) must be the GEO endpoint; No, mine works!
        //     // let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${data}&limit=5&appid=${apiKey}&cnt=5`




        //     // console.log(data)
        //     // console.log(typeof (data)) // object


        //     // function func(url) {
        //     //     return fetch(url)  // return this promise
        //     //     .then(response => response.json())
        //     //     .then(json => (json.results))
        //     // }

        //     // func('https://randomuser.me/api/?results=10')
        //     // .then(users => console.log(users))  // call `then()` on the returned promise to access users
        //     // .catch(err => /* handle errors */)

        //     // parse data
        //     // let jsonData = JSON.parse(data);

        //     // // convert the object into usable data
        //     // let city = data.city.name; // london!
        //     // console.log(city)
        //     // let country = data.city.country; // london!
        //     // console.log(country) // GB
        //     // let coords = data.city.coord;
        //     // console.log(coords) // coord object array
        //     // let lat = data.city.coord.lat
        //     // let lon = data.city.coord.lon
        //     // console.log(lat, lon)

        //     // // lets stick with vanilla!
        //     // // create
        //     // let cityTitle = document.createElement('h1');
        //     // // let cityCoords = document.createElement('h3');

        //     // // set its content
        //     // cityTitle.textContent = `${city}, ${country}`;
        //     // // cityCoords.textContent = `Lat: ${lat}, Lon: ${lon}`;

        //     // // append the style
        //     // cityTitle.setAttribute("style", "color: orange", "fontWeight: bolder")

        //     // // put on the page (append)
        //     // cityName.appendChild(cityTitle)
        //     // // current.appendChild(cityCoords)

        // }

        // // .then(data => console.log(data))  // call `then()` on the returned promise to access users
        // // .catch(err => /* handle errors */)


        // // event handler

        // searchBtn.addEventListener("click", function (event) {
        //     //     $('#search-button').on('click', function (event) {

        //     // compare if an array is empty
        //     // if (historyArray === undefined || historyArray.length == 0) {

        //     //     console.log('historyArray is empty:', historyArray)
        //     // } else {
        //     //     console.log('historyArray contains:', historyArray)
        //     // }
        //     // make on click event occur only if condition met?

        //     // prevent default browser behaviour
        //     event.preventDefault();

        //     // clear viewer
        //     // $('#forecast').empty();

        //     // grab the text from input box
        //     let location = $('#search-input').val();

        //     // push the city to the historyArray
        //     historyArray.push(location); // .capitalize() ??
        //     console.log(historyArray)

        //     // call fetchWeather
        //     // fetchWeather()


        // })
