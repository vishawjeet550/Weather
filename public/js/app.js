var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                if(data.description === "moderate rain"){
                    weatherIcon.className = "wi wi-day-rain"
                }else if(data.description === "haze"){
                    weatherIcon.className = "wi wi-day-fog"
                }else if(data.description === "clear sky"){
                    weatherIcon.className = "wi wi-day-sunny"
                }else if(data.description === "smoke"){
                    weatherIcon.className = "wi wi-day-cloudy-gusts"
                }else if(data.description === "snow"){
                    weatherIcon.className = "wi wi-day-snow"
                }else if(data.description === "scattered clouds"){
                    weatherIcon.className = "wi wi-cloudy"
                }else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) +' ' + String.fromCharCode(176) +'C';
                weatherCondition.textContent = data.description.toUpperCase();
            }
        }) 
    });
})