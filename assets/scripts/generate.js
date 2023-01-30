// generate all the elements 

// testMe()

// function testMe() {

//     alert("I'm here! testMe via generate.js")

// }

// globals
// currently defined within data.js 
// const searchBtn = document.querySelector('.search-button')

const userInput = document.querySelector('#search-input')

const removeBtn = document.querySelector('#remove-btn')

let cityName = document.querySelector('.city-name')
let weatherIcon = document.querySelector('.weather-icon')
let description = document.querySelector('.description')
let current = document.querySelector('.current')
let history = document.querySelector('#history')
let fiveDayLabel = document.querySelector('.five-day-heading')
let buttonsPane = document.querySelector('.buttons-pane')
let viewerPane = document.querySelector('.viewer')

// // array to store history - stored within data.js 
// let historyArray = [];
// console.log('history array is empty:', historyArray)

// how can we access the array from another .js file?
console.log('accessed historyArray from data.js!!:', historyArray)

// generate dynamic elements 
function generateElements(data) {

    // everything that must be rendered to the page 
    console.log("generated elements func was called!")

    // grab a var from another scripts function - need to know!
    // redefine all the vars (reluctantly)
    console.log(data.city.name) // use data dots again (for now)
    let city = data.city.name;
    let country = data.city.country;
    let desc = data.list[0].weather[0].description;
    let feels = data.list[0].main.feels_like;
    let temp = data.list[0].main.temp;
    let hum = data.list[0].main.humidity;
    let wind = data.list[0].wind.speed;
    let { icon } = data.list[0].weather[0];

    // generate city elements

    let cityTitle = document.createElement('h1');
    // clear previous
    cityName.innerHTML = '';
    // set its content
    cityTitle.textContent = `${city}, ${country}`;
    // set data-name 
    cityTitle.setAttribute('data-name', location)
    console.log('cityTitle data- added:', cityTitle.getAttribute('data-name'))
    // append the style 
    cityTitle.setAttribute("style", "color: orange", "fontWeight: bolder")
    // append to page
    cityName.appendChild(cityTitle)

    // generate weather description 

    let cityDescription = document.createElement('h2');
    // clear prior values
    description.innerHTML = '';
    // set new content 
    cityDescription.textContent = `The forecast for ${city} is ${desc}.`
    // append 
    description.appendChild(cityDescription)

    // generate feels_like

    let feelsLikeLabel = document.createElement('h4');
    // clear previous
    feelsLikeLabel.innerHTML = '';
    // use converted feels
    let feelsCels = kelToCel(feels); // cannot access from conversion script
    // set new content 
    feelsLikeLabel.textContent = `Feels like ${feelsCels} °C`;
    console.log('feels like in celsius: ', feelsCels)
    // append
    feelsLikeLabel.style.paddingBottom = '.2rem';
    description.appendChild(feelsLikeLabel)

    // generate temperature 

    let cityTemp = document.createElement('h3');

    // convert to Celsius
    let cels = kelToCel(temp);
    console.log('temp in celsius: ', cels)
    // add celsius content
    cityTemp.textContent = `Temperature is currently: ${cels} °C`;
    // convert to Fahrenheit
    let fahr = kelToFah(temp);
    console.log('temp in fahrenheit: ', fahr)
    // add fahrenheit content 
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

    // generate humidity

    let humidity = document.createElement('h4');
    // set content 
    humidity.textContent = `Humidity is currently ${hum}%`
    // generate google icon HUMIDITY [todo]
    // IF humidity <= 33% (low icon)
    // else if humidity <= 66% (med icon)
    // else (high humidity icon)
    // create icon 
    humIcon = document.createElement('span')
    // add styling 
    humIcon.classList.add('pulse')
    humIcon.classList.add('material-symbols-outlined');
    // set icon content
    humIcon.textContent = 'humidity_percentage';
    // append
    current.append(humIcon, humidity)

    // generate wind elements

    let windSpeed = document.createElement('h4');

    // convert to MPH
    let windMph = kphToMph(wind);
    console.log('wind speed in MPH: ', windMph)
    // set new content
    // windSpeed.textContent = `Wind speed is currently ${wind} KPH`
    windSpeed.textContent = `Wind speed is currently ${windMph} MPH`
    // google air icon
    airIcon = document.createElement('span')
    airIcon.classList.add('pulse')
    airIcon.classList.add('material-symbols-outlined');
    airIcon.textContent = 'air';

    // append elements 
    // current.append(airIcon, windMph) // places them next to each other
    current.appendChild(airIcon)
    current.appendChild(windSpeed)

    // generate the icon

    weatherIcon.innerHTML = `<img src="./assets/images/icons/${icon}.png">`;




}




// testing scope via split .js files 
function renderHistoryButtons() {
    // test
    console.log('renderHistoryButtons function was called successfully!')
}

