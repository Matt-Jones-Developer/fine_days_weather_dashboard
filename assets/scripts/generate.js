// generate all the elements 

// testMe()
// function testMe() {
//     alert("I'm here! testMe via generate.js")
// }

// globals

const removeBtn = document.querySelector('#remove-btn')

let cityName = document.querySelector('.city-name')
let weatherIcon = document.querySelector('.weather-icon')
let description = document.querySelector('.description')
let current = document.querySelector('.current')
let history = document.querySelector('#history')
let fiveDayLabel = document.querySelector('.five-day-heading')
let buttonsPane = document.querySelector('.buttons-pane')


// generate dynamic elements for current weather 

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

// 5-day forecast elements generation

function generateFiveDayElements(data) {

    // 5-day forecast
    console.log(data.list[0])
    // test
    console.log("generated 5-day elements func was called!")

    const fiveDayTitle = document.createElement("h1");
    fiveDayTitle.style.padding = '1rem';
    // clear prior values
    fiveDayLabel.innerHTML = '';
    fiveDayTitle.textContent = 'Five Day Forecast';
    fiveDayLabel.prepend(fiveDayTitle);
    // var to iterate through data list (dt[i])
    const forecastList = data.list;
    // grab the min and max for the day [todo]
    // let tempMin = forecastList.main.temp_min;
    // let tempMax = forecastList.main.temp_max;
    // console.log(tempMin, tempMax) // undefined
    // locate 5-day container div
    const forecast5Container = document.querySelector(".forecast-5");
    forecast5Container.classList.add("d-inline-flex");

    // iterate through dt time stamps
    // clear prior values
    forecast5Container.innerHTML = '';
    // index each card
    let num = 0;
    // iterate through each stamp, skipping every 8
    for (let i = 7; i < forecastList.length; i += 8) {
        // increase data-index by 1
        num = ++num;
        // declare forecast item each pass
        const forecast = forecastList[i];
        // console.log('this days forecast stamp:', forecast)
        // set the days icon
        let fiveDayIcon = forecast.weather[0].icon;
        // console.log('fiveDayIcon fetch:', fiveDayIcon)
        // set temp var again
        let temp = forecast.main.temp;
        console.log('temp check: ', temp)
        // set humidity var
        let hum = forecast.main.humidity;
        console.log('hum check: ', hum)
        // create the card element
        const card = document.createElement("div");
        card.classList.add("card", "bg-dark", "m-3", "justify-content-center");
        // console.log(num);
        // set card attr and styling 
        card.setAttribute('data-index', num);
        card.style.padding = '1rem';
        card.style.paddingBottom = '2rem';
        // create card body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        // add title
        const title = document.createElement("h4");
        title.classList.add("card-title");
        // add the date 
        // convert dt_txt via moment 
        let fiveDayDate = forecast.dt_txt
        // let formattedDate = fiveDayDate.format('Do MM')
        let formattedDate = moment(fiveDayDate).format('dddd Do MMMM');
        // title.textContent = forecast.dt_txt; // must be formatted using moment
        // clear card title
        title.innerHTML = '';
        // set new content 
        title.textContent = formattedDate;
        // gen temp label
        const tempLabel = document.createElement("p");
        tempLabel.classList.add("card-text", "pulse");
        // convert to celsius 
        let forecast5Temp = kelToCel(temp);
        console.log('temp in celsius: ', forecast5Temp)
        // clear previous
        tempLabel.innerHTML = '';
        // set new content 
        tempLabel.textContent = `Temperature: ${forecast5Temp} °C`;

        // addition of humidity reading for 5-day
        const humLabel = document.createElement('P');
        humLabel.classList.add("card-text", "humidity");
        // clear previous
        humLabel.innerHTML = "";
        // set new content
        humLabel.textContent = `Humidity: ${hum}%`;

        // if temp is below 5 - change its colour
        if (forecast5Temp <= 5) {
            tempLabel.style.color = 'lightblue';
        } else if (forecast5Temp <= 12) {
            tempLabel.style.color = 'orange';
        } else {
            // it's warm!
            tempLabel.style.color = '#D65745';
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
        cardBody.append(title, tempLabel, humLabel, weather);
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
    // this should be NOT - it doesn't work also!
    // if (!historyArray.includes($('#search-input').val())) {
    // loop through array items
    for (let i = 0; i < historyArray.length; i++) {

        // assign item to btn
        let btnLabel = historyArray[i];
        count++;
        // let capBtnLabel = btnLabel.capitalize();
        console.log('btnLabel has rendered via array: ', btnLabel)
        // generate buttons from array
        newBtn = document.createElement('button');
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
    // } else {
    //     alert('Location already saved. Please choose another location!')
    // }

    // this is not right!  it currently deletes itself and cannot get logs?

    // add event listener here?? How to get it outside this function
    newBtn.addEventListener("click", function (event) {
        console.log('locations.dataIndex value? :', locations.dataIndex)
        // Recall the correct dataIndex location data from localStorage 

        // if newBtn.data-name.matches(location.dataIndex) ??
        if (event.target.getAtrribute('data-name') === locations.dataIndex) {

            // retrieve correct location and data
            locations = JSON.parse(localStorage.getItem("locations"));

            // re-render the data to the correct elements
            // re-call functions 
            generateElements() // supposed to data as an arg?
            generateFiveDayElements() // supposed to data as an arg?

        }

    })
}


// LOCAL STORAGE ISSUE - IT OVERWRITES THE LAST 
// INSTEAD OF USING THE DATA-INDEX +1 TO ADD A NEW LOCATION ?

// expected behaviour: (location-1, location-2, location-3)

// THIS IS CURRENTLY UNUSED - BUT ACCESSIBLE BY COMMENTING IN LINE 150 IN DATA.JS

// save to localStorage functions - whats the cleanest way - rather than 3 separate functions??
function saveCityToLocal(cityData, country) {

    // object that holds city
    let cityDataObject = {
        city: cityData,
        country: country
    }

    console.log('cityDataObject - complete?: ', cityDataObject) //ok!

    let locations = [];
    console.log('location array:', locations)
    // if local has locations 
    if (localStorage.getItem("locations")) {
        // grab them 
        locations = JSON.parse(localStorage.getItem("locations"));
        console.log('saved locations found:', locations)
    }
    // add a new data-index to each saved location and ++ (must be +1??)
    cityDataObject.dataIndex = locations.length + 1;
    console.log('add 1 more to data-index', cityDataObject.dataIndex)
    // push new object to array
    locations.push(cityDataObject);
    console.log('new location pushed to array:', locations)
    // use the data-index as the key
    localStorage.setItem(`location-${cityDataObject.dataIndex}`, JSON.stringify(cityDataObject));

    console.log('new location index stored and as a new key?!: ', localStorage, cityDataObject.dataIndex)
    // debug
    console.log('cityDataObject set in local:', localStorage) // OK

}

// LOCAL STORAGE FUNCTION (ACTIVE)

// what input args does this need?
// we want it to save a new object PER CITY SEARCH - not all together

// save to localStorage functions - whats the cleanest way - rather than 3 separate functions??
function saveAllToLocal(data) {

    // object that holds city
    let cityDataObject = {
        // WHY CANT I RE-USE VARS??
        city: data.city.name,
        country: data.city.country,
        desc: data.list[0].weather[0].description,
        feels: data.list[0].main.feels_like,
        temp: data.list[0].main.temp,
        hum: data.list[0].main.humidity,
        wind: data.list[0].wind.speed,
        icon: data.list[0].weather[0]
        // not required
        // dataIndex: 0
    }

    console.log('cityDataObject - complete?: ', cityDataObject) //ok!

    // empty array to hold the location saves
    let locations = [];
    console.log('location array:', locations)
    // if local has locations - retrieve 
    if (localStorage.getItem("locations")) {
        // grab them 
        locations = JSON.parse(localStorage.getItem("locations"));
        console.log('saved locations found:', locations)
    }

    // add a new data-index to each saved location and ++ (must be +1??)
    cityDataObject.dataIndex = locations.length + 1;
    console.log('add 1 more to data-index', cityDataObject.dataIndex)
    // push new object to array
    locations.push(cityDataObject);
    console.log('new location pushed to array:', locations)
    // use the data-index as the key
    localStorage.setItem(`location-${cityDataObject.dataIndex}`, JSON.stringify(cityDataObject));

    console.log('new location index stored and as a new key?!: ', localStorage, cityDataObject.dataIndex)
    // debug
    console.log('cityDataObject set in local:', localStorage) // OK

}


