// generate all the elements 

// button elements
const removeBtn = document.querySelector('#remove-btn')
// force btn as a global
newBtn = document.createElement('button');

// globals
let cityName = document.querySelector('.city-name')
let weatherIcon = document.querySelector('.weather-icon')
let description = document.querySelector('.description')
let current = document.querySelector('.current')
let history = document.querySelector('#history')
let fiveDayLabel = document.querySelector('.five-day-heading')
let buttonsPane = document.querySelector('.buttons-pane')


// generate dynamic elements for current weather 

function generateElements(data) {

    // debug
    console.log("generated elements func was called!")

    // grab a var from another scripts function? currying? [TODO]
    // redefine all the vars (reluctantly)
    console.log(data.city.name)
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
    let feelsCels = kelToCel(feels);
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

    // generate wind element

    let windSpeed = document.createElement('h4');

    // convert to MPH
    let windMph = kphToMph(wind);
    console.log('wind speed in MPH: ', windMph)
    // set new content
    windSpeed.textContent = `Wind speed is currently ${windMph} MPH / ${wind} KPH`
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
    // set content
    fiveDayTitle.textContent = 'Five Day Forecast';
    // prepend to top
    fiveDayLabel.prepend(fiveDayTitle);
    // var to iterate through data list (dt[i])
    const forecastList = data.list;
    // grab the min and max for the day [TODO]
    // let tempMin = forecastList.main.temp_min;
    // let tempMax = forecastList.main.temp_max;

    // locate 5-day container div
    const forecast5Container = document.querySelector(".forecast-5");
    forecast5Container.classList.add("d-inline-flex");

    // dt time stamps
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

function renderHistoryButtons() {

    // check array items
    console.log(searchHistory)

    // update the value of userInput
    let checkEntry = $('#search-input').val();
    console.log(checkEntry)

    // stop duplicates (clear previous)
    $('.buttons-pane').empty();

    // loop through array items
    for (let i = 0; i < searchHistory.length; i++) {

        // catch duplicate entry
        // what conditional will work here??
        // problem is (i think) that the item is 
        // it checks here but value is ALWAYS added?
        if (!searchHistory.includes(checkEntry)) {

            // assign item to btn
            let btnLabel = searchHistory[i];
            // debug
            console.log('btnLabel has rendered via array: ', btnLabel)
            // generate buttons from array
            let newBtn = document.createElement('button');
            //add classes
            newBtn.classList.add('btn', 'btn-secondary', 'searched-city');
            // add a data-attribute 
            newBtn.setAttribute('data-name', searchHistory[i]);

            // style buttons
            newBtn.style.backgroundColor = 'orange';
            newBtn.style.borderRadius = '1rem';
            newBtn.style.textTransform = 'capitalize';
            newBtn.style.width = '8rem';
            // add the city as the button text
            newBtn.textContent = searchHistory[i];
            // append the button to the aside
            buttonsPane.appendChild(newBtn)


        } else {
            console.log('city already in history!')
            alert('city already in history!');
            break;
        }

    }

}

// added history btns event listener 

// why must this be a JQ on. click event here? - we need the second element
// newBtn.addEventListener("click", function (event) {
$('.buttons-pane').on("click", "button.searched-city", function (event) {
    // prevent default
    event.preventDefault();
    // log the target data-name (per button)
    console.log(event.target.getAttribute('data-name'))

    // define the name 
    let dataName = event.target.getAttribute('data-name')

    // re-fetch from the API
    // .then
    fetchData(dataName).then(data => {

        // re-render elements 
        generateElements(data)
        generateFiveDayElements(data)
        // set pane colour
        viewerPane.style.backgroundColor = '#fff';

    })

});


removeBtn.addEventListener('click', function (event) {

    // if array is empty

    if (searchHistory === undefined || searchHistory.length == 0) {
        // alert
        alert('Nothing to clear!')

    } else {
        // clear all the buttons, array and storage 
        $('.buttons-pane').empty();

        // clear local
        // must be BEFORE array clearing 
        localStorage.clear();

        // clear the array
        searchHistory = [];
        console.log('history array is now cleared:', searchHistory)
        // alert last
        alert('Search history will clear now!')
    }

})


