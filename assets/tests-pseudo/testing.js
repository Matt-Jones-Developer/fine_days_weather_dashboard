// testing ideas

// testMe()
// function testMe() {
//     alert("I'm here! testMe via generate.js")
// }

// // function - set date and time 
// function getDateTime() {
//     // set moment for todays date 
//     let today = moment()
//     console.log(today) // object
//     // format date
//     let currentDate = moment().format('[Today is] dddd, Do MMMM');
//     console.log(currentDate)
//     // append it to element 
//     let dateTag = document.querySelector('#date');
//     dateTag.append(currentDate)

//     // get the time and update it every second
//     setInterval(function () {
//         // set time 
//         document.querySelector('#time').textContent =
//             today.format('[Current time (GMT):] HH:mm:ss')
//         // update every second
//     }, 1000)
// }

// accessing variables between functions  


// currying vs returning variables ??


// funcOne()

// function funcOne() {

//     // assign all the vars as an object
//     let dataObject = {
//         city: 'city',
//         desc: 'sunny',
//         temp: 12
//     }

//     let city = 'London';
//     let num = 3;
//     console.log(dataObject)
//     console.log(city)
//     console.log(num)

//     // return what we are doing here
//     return dataObject, city;
// }

// // call here wont access the var above (obvs)
// funcTwo()

// function funcTwo() {

//     // random num 
//     let num2 = 4;
//     // test var (access)
//     let access = true;
//     console.log('access: ', access)

//     // access funcOne's vars?
//     // call funcOne as a var!
//     let fromOne = funcOne();

//     // do something 
//     let result = fromOne + num2;
//     console.log(num2)
//     console.log(fromOne)
//     console.log('result:', result)
//     // console.log(dataObject)

// }

// access a variable to place inside an object within another function?
// avoid 'is not defined'
hasData()

function hasData() {

    let city = 'london';
    let desc = 'sunny';
    let cels = 12;
    let hum = 81;

    // send them as inputs to whichever function needs them!
    saveToLocal(city, desc, cels, hum)
}

// saveToLocal()

function saveToLocal(city, desc, cels, hum) {

    let locationData = {
        city: city,
        description: desc,
        temp: cels,
        humidity: hum

    }

    console.log("I'm inside function 2!", locationData)
    
}