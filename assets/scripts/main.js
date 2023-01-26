// location widget app

const apiKey = '8d752016daf18245563fe658805d4425';

$('#search-button').on('click', function(event) {

    event.preventDefault();

    // grab the text from input box

    let location = $('#search-input').val();

    // let queryURL = `"https://api.openlocationmap.org/data/2.5/weather?lat={lat}&lon={lon}&"
    // + location + "&appid={${apiKey}}"`;

    // by city name (search entry)
   let queryURL =`api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`
    console.log(queryURL)

    // fetch from API
    fetch(queryURL)
    .then(response => response.json())
    .then(location => {
        console.log(location)


    })
})





// how to retrieve weather information from openlocationmap.org
// if (navigator.geolocation) {
//     //Return the user's longitude and latitude on page load using HTML5 geolocation API
//     window.onload = function () {
//         navigator.geolocation.getCurrentPosition(getCurrentLocation);

//     }

// }


// function getCurrentLocation(position) {

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
// var myname = "test"
// window.open("http://example.com/?q=" + myname); // Classic string concatenation
// window.open(`http://example.com/?q=${myname}`); // Using template literal 





