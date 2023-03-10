
<!-- Readme top-->
<a name="readme-top"></a>

<!-- Project shields -->

<!-- centered shields -->

<span style="display:block" align="center" class="shields">

  [![Stargazers][stars-shield]][stars-url]
  [![Issues][issues-shield]][issues-url]
  [![MIT License][license-shield]][license-url]
  [![LinkedIn][linkedin-shield]][linkedin-url]

</span>

<!-- Readme Header -->

<div align="center">
  <img src="assets/images/screenshots/header.png" alt="header-image" width="800" height="400">
</div>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Matt-Jones-Developer/fine_days_weather_dashboard">
    <!-- <img src="assets/images/screenshots/logo.png" alt="Logo" width="100" height="100"> -->
  </a>

#
<h2 align="center">"Fine Days": The Weather Dashboard App</h2>

  <p align="center">
    A more complex weather app, that ultilises the openweathermap API.
    Coded in vanilla JavaScript with dynamically rendered HTML, and an HTML and CSS interactive GUI.
    <br />
    <a href="https://github.com/Matt-Jones-Developer/fine_days_weather_dashboard/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Matt-Jones-Developer/fine_days_weather_dashboard">View Project</a>
    ·
    <a href="https://github.com/Matt-Jones-Developer/fine_days_weather_dashboard/issues">Report Bug</a>
    ·
    <a href="https://github.com/Matt-Jones-Developer/fine_days_weather_dashboard/issues">Request Feature</a>
    ·
    <a href="https://github.com/Matt-Jones-Developer?tab=repositories">Check out my work</a>
    ·
  </p>
</div>

#

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

My assignment was to build a weather app that utilises openweathermap API.  The program will wait for a user to input a city, which catches blank or garbage entries and notifies the user.  Once a city has been successfully entered, the app will fetch the data from the API and the render functions dynamically generate the content to the page!

The app will generate a current forecast including a city and country, the temperature, humidity and wind speed. I also used some cool google font icons that animate.   Below this, a 5-day forecast is generated into Bootstrap cards, I used moment to set the date and time.  I added some nice touches including temperature conversions, KPH to MPH and Fahrenheit to Celsius - I offered the user both F and C but I'd like to make toggles that allow the user to choose in the updated version.  

I really enjoyed this build,  at first I focussed on basic styling using Bootstrap, then I wanted to make my pseudo code really detailed and insightful to help me know exactly what variables and functions to create; so I mapped out everything that the build required, breaking issues down into smaller and smaller problems until I felt like I knew exactly how to reproduce it in code.  My initial code was more about accessing the data so I allowed it to get pretty messy, just so it all worked.  

I really enjoyed working with the API and I love dot notation!

Several days later, I vastly improved the code by putting everything into functions.  But the fetch and .then code was still very confused.  I knew I'd want to overhaul the code again and really show off my progress but I broke everything.  I did not understand what the fetch was doing (other than a promise) I ended the session feeling like an imposter and was very concerned that I couldn't solve the issues.  Bad vibes!

The next day I did a tutorial on both .fetch async and await, and function input arguments;  well worth taking the time to go over these as suddenly it all made a lot more sense and knew exactly how to structure the functions to get them to all communicate together.  I was so impressed it was like a light suddenly switched on in my head and made everything much clearer!  

I am very proud of how I problem solved this assignment, how well organised and structured my code is and how I overcame the problems to create a pretty polished final product.  I will definitely be making a 2.0 of this weather app and add a lot of new features including a map API and a trending tourist spots API.

## Overview
 
* User can search for any city (or country on occassion!) and retrieve a detailed weather forecast for both current and the next 5 days.

* the user search history is saved to local storage in an array and buttons are generated that allow the user to go back to that city using another .then built into the buttons function.

* Both forecasts feature city name and country, temperature in C or F, humidity %, wind speed in KPH and MPH.  A description is also included.

* A weather icon that dynamically changes with each forecast.

* If the user tries to enter a duplicate item; it will not generate a new button and will alert the user.  

* The app also catches 404's and alerts the user the city was not found.

* The temperature text colour will change to blue < 5, orange < 12 or a warm red for any temperature above that.

* pulsing icons and temperature info thanks to google font icons!

* I do still need to make it fully responsive for mobiles so will be updating this as soon as I can.

#

<!-- the product -->

## The Product

Product screenshot:

[![Product Name Screen Shot][product-screenshot]](https://github.com/Matt-Jones-Developer/fine_days_weather_dashboard)

[![Product Name Screen Shot][product-screenshot-2]](https://github.com/Matt-Jones-Developer/fine_days_weather_dashboard)


## Criteria


* Create a weather dashboard with form inputs.
  * When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
  * When a user views the current weather conditions for that city they are presented with:
    * The city name
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
    * The wind speed
  * When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
  * When a user clicks on a city in the search history they are again presented with current and future conditions for that city
      

#

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With:

<!-- languages logos -->

![js-logo]::: [![JavaScript]][javascript-url] ![html5-logo]::: [![HTML5]][html5-url] ![css-logo]::: [![CSS]][css-url]



<p align="right">(<a href="#readme-top">back to top</a>)</p>

#

<!-- GETTING STARTED -->

## Getting Started

This very easy to use GUI application that can be accessed through your web browser, you can also see the JS working under the hood by entering the console.  I highly recommend testing using CHROME, since the temperature text will pulse on the five-day cards!

When you first load the page, the current weather panel is blended into the main body.  When you select a city (I check for blank or incorrect entries too), the 'viewer' section will turn white and render all the current weather data onto the page, dynamically.
Once you have noticed the pulse animated icons, you can scroll down to view a five day forecast, with more colour changing, pulse animated temperatures (Chrome only).  

To get started, search for a city (you can also search for certain countries too, (but check the country code, it may be in the U.S).

Once complete, you hit the search button or press 'enter' - the weather update will be printed to the viewer, ready for you to peruse!
API calls in city, country, temperature, humidity and wind speed.  These are handled by conversion functions that output in Celsius, Fahrenheit and MPH/KPH. 

Every city is saved to it's own button, which can be re-called just by clicking them. These cities will be saved in local storage until you remove them.  If you hit the remove history button - they will clear.

Please open main.js within the scripts folder to view my JS code. I split the code into data and generated scripts as I felt it was much cleaner and better for future updating and maintenance. 

You can also see my tests folder for all the testing, tinkering and coding revisions I made to reach my solutions.  The pseudo was  a lot more focussed this time, breaking down each problem and trying to work out the data side of things first, before tinkering with the GUI styling too much.  But, I can't resist CSS styling most days, so I always start to improve the look and feel of the app from day 1 to take a break from the coding solutions!

I am particularly proud of this clean, professional code, the overall look and feel and that (a few small bugs aside) it meets all the criteria.

Enjoy.

#
### Prerequisites

N/A

#

### Installation

No installation required.  Just load your browser. 

You can clear your caches local storage (buttons and cities visited) by hitting the remove button.


----------------------------------


<!-- USAGE EXAMPLES -->
## Usage and Screenshots

Screenshot of the programs output with
fully responsive design:

![tablet-screenshot1]

<!-- centered images -->
<div align="center">
<!-- ![mobile-screenshot1] ![mobile-screenshot2] -->
  <img src="assets/images/screenshots/mobile-screenshot1.png">
  <img src="assets/images/screenshots/mobile-screenshot2.png">
</div>

Console log:

![console-output-screenshot]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

----------------------------------

<!-- ROADMAP -->
## Roadmap

1. build up with a MAP API, some trending tourist sites and local restaurants etc
2. improve on the existing features and re-design the GUI so there's no blank space 
3. improve the UI further, add new features and add my UX design principles 
4. build an advanced user log-in backend database that stores all the user data 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#

<!-- UX/UI DESIGN -->
## UX/UI Design

Screenshot of the web apps UI design stage:

[![Design Screen Shot][wireframe-screenshot]](https://github.com/Matt-Jones-Developer/fine_days_weather_dashboard)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#

<!-- CONTRIBUTING -->
## Contributing

N/A

#

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

#

<!-- CONTACT -->
## Contact

Matt Jones - [@glitchy81_dev](https://twitter.com/glitchy81_dev)

#

## Project links

Project Repo Link: [https://github.com/Matt-Jones-Developer/password_generator](https://github.com/Matt-Jones-Developer/fine_days_weather_dashboard)


Deployed Project Link: [https://matt-jones-developer.github.io/password_generator](https://matt-jones-developer.github.io/fine_days_weather_dashboard)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Developed from this original README Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/matt-jones-developer/fine_days_weather_dashboard.svg?style=for-the-badge
[contributors-url]: https://github.com/matt-jones-developer/password_generator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/matt-jones-developer/fine_days_weather_dashboard.svg?style=for-the-badge
[forks-url]: https://github.com/Matt-Jones-Developer/password_generator/network/members
[stars-shield]: https://img.shields.io/github/stars/matt-jones-developer/fine_days_weather_dashboard.svg?style=for-the-badge
[stars-url]: https://matt-jones-developer.github.io/fine_days_weather_dashboard/stargazer
[issues-shield]: https://img.shields.io/github/issues/matt-jones-developer/fine_days_weather_dashboard.svg?style=for-the-badge
[issues-url]: https://github.com/Matt-Jones-Developer/fine_days_weather_dashboard/issues
[license-shield]: https://img.shields.io/github/license/matt-jones-developer/fine_days_weather_dashboard.svg?style=for-the-badge
[license-url]: https://github.com/Matt-Jones-Developer/fine_days_weather_dashboard/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/matt-jones-zx81
[product-screenshot]: assets/images/screenshots/app_screenshot.png
[product-screenshot-2]: assets/images/screenshots/app_screenshot_2.png
[product-screenshot-3]: assets/images/screenshots/app_screenshot_3.png
[product-screenshot-4]: assets/images/screenshots/app_screenshot_4.png
[console-output-screenshot]: assets/images/screenshots/console_output.png
[wireframe-screenshot]: ./assets/images/screenshots/wireframing.png
[tablet-screenshot1]: ./assets/images/screenshots/ipad-screenshot.png
[mobile-screenshot1]: ./assets/images/screenshots/mobile-screenshot1.png
[mobile-screenshot2]: ./assets/images/screenshots/mobile-screenshot2.png
[javascript-url]: https://www.javascript.com
[html5-url]: https://html5.org/
[css-url]: https://www.w3.org/Style/CSS/Overview.en.html
[js-logo]: assets/images/logos/js.svg
[html5-logo]: assets/images/logos/html5.svg
[css-logo]: assets/images/logos/css3.svg

