// location widget app

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

const apiKey = '8d752016daf18245563fe658805d4425';

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


$('#search-button').on('click', function (event) {

    event.preventDefault();

    // grab the text from input box
    let location = $('#search-input').val();

    // by city name (search entry)
    let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&cnt=5`
    console.log(queryURL)

    // fetch from API
    fetch(queryURL)
        .then(response => response.json())
        .then(location => {
            console.log(location)
            console.log(typeof (location)) // object

            // convert the object into usable data
            let city = location.city.name; // london!
            console.log(city)
            let country = location.city.country; // london!
            console.log(country) // GB
            let coords = location.city.coord;
            console.log(coords) // coord object array
            // let lat = location.city.coord[0] // nope its an object
            // let lon = location.city.coord[1] // use DOT notation
            let lat = location.city.coord.lat // nope its an object
            let lon = location.city.coord.lon // use DOT notation
            console.log(lat, lon)

            // // create the element(s) to display them JQUERY
            // let cityTag = $("<h1>")
            // console.log(cityTag) // shows a div 
            // // set content 
            // cityTag.textContent = city; // adds city
            // // append it to the page
            // cityTag.append(`<tr>
            //                 <td> ${city}</td>
            //                 <td> ${country}</td>
            //                 </tr>`)

            // // simpler? Nope!
            // cityTag.append(city) // neither will display on page?

            // lets stick with vanilla!
            // create
            let cityTitle = document.createElement('h1');
            // let cityCoords = document.createElement('h3');

            // set its content
            cityTitle.textContent = `${city}, ${country}`;
            // cityCoords.textContent = `Lat: ${lat}, Lon: ${lon}`;

            // put on the page (append)
            cityName.appendChild(cityTitle)
            // current.appendChild(cityCoords)

            // save to local storage 


            // call getWeather
            getWeather(lat, lon);

            // getWeather()
            // let temp = location.city.temp;
            // console.log(temp)
            // obvs weather doesn;t exist within this object
            // so how do we access the weather stats required??
            function getWeather(lat, lon) {
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

                        // getWeather(lat, lon);
                        // add and append it below 
                        let cityTemp = document.createElement('h3');
                        cityTemp.textContent = `The current temperature is: ${cels} °C`;
                        // for American folks!
                        let cityTempF = document.createElement('h3');
                        cityTempF.textContent = `For you American folk, that's: ${fahr} °F`;
                        // append to page 
                        current.appendChild(cityTemp)
                        current.appendChild(cityTempF)



                        // log humidity
                        console.log(data["main"]["humidity"] + '%')
                        let hum = data["main"]["humidity"];
                        let humidity = document.createElement('h4');
                        humidity.textContent = `Current humidity is ${hum}%`
                        current.appendChild(humidity)

                        // windspeed
                        console.log(data.wind.speed)
                        let wind = data.wind.speed;
                        let windSpeed = document.createElement('h4');
                        windSpeed.textContent = `Wind speed is currently ${wind} KPH`
                        // current.appendChild(windSpeed)

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

                        // feels like 
                        console.log(data["main"]["feels_like"]) // ok
                        let feels = data["main"]["feels_like"]
                        let feelsLike = document.createElement('h5');
                        feelsLike.textContent = `Feels like ${feels} F`;
                        current.appendChild(feelsLike)

                        // let iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

                        //display icon:
                        // let iconDiv = document.createElement('img');
                        // iconDiv.setAttribute('class', 'weather-icon');
                        // iconDiv.innerHTML = `<img src="${iconImg}">`;
                        // weatherIcon.append(icon)

                        // $('#weather-icon').attr('src', iconUrl);

                        weatherIcon.innerHTML = `
                        <img src="./assets/images/icons/${icon}.png">`;


                    }
                })
            }



        })
})



            // let fday = "";
            // location.daily.forEach((value, index) => {
            //     if (index > 0) {
            //         let dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
            //             weekday: "long",
            //         });
            //         let icon = value.weather[0].icon;
            //         let temp = value.temp.day.toFixed(0);
            //         fday = `<div class="forecast-day">
            //                 <p>${dayname}</p>
            //                 <p><span class="ico-${icon}" title="${icon}"></span></p>
            //                 <div class="forecast-day--temp">${temp}<sup>°C</sup></div>
            //             </div>`;
            //         forecastEl[0].insertAdjacentHTML('beforeend', fday);
            //     }
            // });
            // let fiveDay = location.weather[0];
            // console.log(fiveDay)


