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
    // debug
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

// 5-day forecast generation function

function generateFiveDayElements(data) {

    // test
    console.log("generated 5-day elements func was called!")
    // fetch 5-day forecast here
    console.log(data.list[0])
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
// check if user input is already in an array? - failing currently

function renderHistoryButtons() {

    console.log(!historyArray.includes($('#search-input').val()));
    console.log(historyArray)
    console.log($('#search-input').val())
    console.log(historyArray.includes($('#search-input').val()));


    // stop duplicates (clear previous)
    $('.buttons-pane').empty();
    // re-show from remove function
    // buttonsPane.style.display = "block"; - nope!
    let count = 0;
    // catch duplicate entry
    // why doesn't this !not work here?? - because location is a very strange object!
    // if (!historyArray.includes(location)) {
    // this should be NOT DAMN IT!!!
    if (!historyArray.includes($('#search-input').val())) {
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

            // why won't this persist??
            if (count > 5) {
                let counterAlert = document.createElement('h3');
                counterAlert.innerHTML = "\nWoah! How many cities yer visiting there?\nWe about to make this UI look well ugly!"
                current.appendChild(counterAlert)
            }
        }
    } else {
        alert('Location already saved. Please choose another location!')
    }


}