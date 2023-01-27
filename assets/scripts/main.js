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

const apiKey = '8d752016daf18245563fe658805d4425';

// moment day and time 
let today = moment()
console.log(today) // object
let currentDate = moment().format('[Today is] dddd, Do MMMM');
console.log(currentDate)
// append it to element 
let dateTag = document.querySelector('#date');
dateTag.append(currentDate)

// how to put a setInterval into it's own function ?

setInterval(function () {

    let today = moment();

    document.querySelector('#time').textContent =
        today.format('[Current time (GMT):] HH:mm:ss')
    // specify every second to update
}, 1000)

// 

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

    // by city name (search entry) must be the GEO endpoint ??
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

            // save to local storage 

            // fetch 5-day forecast here
            console.log(data.list[0])
            console.log(data.list[0].dt_txt) // grabs the current day 
            // slap list in a var
            let dayList = data.list
            let fiveDayEl = document.getElementsByClassName("forecast-5");

            // // call test
            // getFiveDayForecast()
            // // loop through each day
            // function getFiveDayForecast(city) {
            //     // fetch? required here?
            //     let forecast5 = []
            //     // let dayList = data.list
            //     // iterate through each day
            //     for (let i = 0; i < data.list.length; i++) {
            //         const element = data.list[i];

            //         console.log(element)

            //     }
            // }

            const forecastList = data.list;
            const forecastContainer = document.getElementById("forecast-container");
            forecastContainer.classList.add("d-inline-flex");

            for (let i = 0; i < forecastList.length; i += 8) {
                const forecast = forecastList[i];
                const card = document.createElement("div");
                card.classList.add("card", "text-white", "bg-dark", "m-3");

                const cardBody = document.createElement("div");
                cardBody.classList.add("card-body");

                const title = document.createElement("h5");
                title.classList.add("card-title");
                title.textContent = forecast.dt_txt;

                const temp = document.createElement("p");
                temp.classList.add("card-text");
                temp.textContent = `Temperature: ${forecast.main.temp} C`;

                const weather = document.createElement("p");
                weather.classList.add("card-text");
                weather.textContent = `Weather: ${forecast.weather[0].description}`;

                // Create an image element for the weather icon
                const icon = document.createElement("img");
                icon.classList.add("card-img-top");
                // Set the src of the image element to the icon url
                icon.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
                icon.style.width = "70px";
                icon.style.height = "70px";

                // Append the image element to the card
                card.appendChild(icon);
                cardBody.appendChild(title);
                cardBody.appendChild(temp);
                cardBody.appendChild(weather);

                card.appendChild(cardBody);
                forecastContainer.appendChild(card);
            }





            // let fiveDayCards = $("<h1>")
            // console.log(cityTag) // shows a div 
            // // set content 
            // cityTag.textContent = city; // adds city
            // // append it to the page
            // cityTag.append(`<tr>
            //                 <td> ${city}</td>
            //                 <td> ${country}</td>
            //                 </tr>`)            


            // call getWeather
            getWeather(lat, lon);

            // YOU DO NOT WANT TO NEST THESE - PLACE ALL IN THEIR OWN FUNCTIONS 

            // 

            // getWeather()
            // let temp = data.city.temp;
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

                        // feels like 
                        console.log(data["main"]["feels_like"]) // ok
                        let feels = data["main"]["feels_like"]
                        let feelsLike = document.createElement('h4');
                        feelsLike.textContent = `Feels like ${feels} F`;
                        description.appendChild(feelsLike)

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


// access an object array element?


// how to retrieve weather information from opendatamap.org
// if (navigator.geodata) {
//     //Return the user's longitude and latitude on page load using HTML5 geodata API
//     window.onload = function () {
//         navigator.geodata.getCurrentPosition(getCurrentdata);

//     }

// }


// function getCurrentdata(position) {

//     latitude = position.coords.latitude;
//     longitude = position.coords.longitude;

//     console.log(latitude);
//     console.log(longitude);

//     $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&APPID=b7aaa3a349294d5706002e82df3de1ea&units=metric", function (data) {
//         console.log(data);
//         console.log(weather.main.temp);
//         $(".city").append(name + " ");
//         $(".temperature").append(temp + " ");
//         $(".weatherdescription").append(field + " ");
//     })

// };



// interpolate a queryURL
// let myname = "test"
// window.open("http://example.com/?q=" + myname); // Classic string concatenation
// window.open(`http://example.com/?q=${myname}`); // Using template literal 


// write a function that fetches a 5-day forecast from openweatherapp.org api?
// var key = "YOUR KEY";
// var city = "YOUR CITY"; // My test case was "London"
// var url = "https://api.openweathermap.org/data/2.5/forecast";

// $.ajax({
//   url: url, //API Call
//   dataType: "json",
//   type: "GET",
//   data: {
//     q: city,
//     appid: key,
//     units: "metric",
//     cnt: "10"
//   },
//   success: function(data) {
//     console.log('Received data:', data) // For testing
//     var wf = "";
//     wf += "<h2>" + data.city.name + "</h2>"; // City (displays once)
//     $.each(data.list, function(index, val) {
//       wf += "<p>" // Opening paragraph tag
//       wf += "<b>Day " + index + "</b>: " // Day
//       wf += val.main.temp + "&degC" // Temperature
//       wf += "<span> | " + val.weather[0].description + "</span>"; // Description
//       wf += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>" // Icon
//       wf += "</p>" // Closing paragraph tag
//     });
//     $("#showWeatherForcast").html(wf);
//   }
// });




// //Source: https://stackoverflow.com/questions/49640174





