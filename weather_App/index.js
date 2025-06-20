// WEATHER APP
document.addEventListener("DOMContentLoaded", () => {
    
const weatherForm = document.querySelector(".weatherForm");
const  cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = "06b988818435edff97eacf2049590a0e";
const lastCity = localStorage.getItem('lastCity');
    if (lastCity) { 
        cityInput.value = lastCity;
    }

weatherForm.addEventListener("submit", async (event)=>{
    event.preventDefault();
    

    const city = cityInput.value;
    if(city){
        try{
            const weatherData =  await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error.message);

        }
    
    }
    else{

      displayError("Please enter a city name");  
    }
    
});
async function getWeatherData(city) {
    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fetch weather data");

    }
    return response.json();

}
function displayWeatherInfo(data){
 
    const {name: city,
         main:{temp, humidity}, 
         weather:[{description, id}]} = data;
         card.textContent = "";
          
         //      card.style.display = "flex";
         const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");
    
        cityDisplay.textContent = city;
        tempDisplay.textContent = `${temp.toFixed(1)}°C`;
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");


        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);

        localStorage.setItem('lastCity', cityInput.value);
        console.log(localStorage.getItem("value"));
        //card = localStorage.getItem('value');
}
function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
        return "⛈️";
              case(weatherId >= 300 && weatherId < 400):
        return "🌦️";
         case(weatherId >= 500 && weatherId < 600):
        return "🌦️";
             case(weatherId >= 600 && weatherId < 700):
        return "❄️";
        case(weatherId >= 700 && weatherId < 800):
        return "🌁";
                case(weatherId ===  800):
        return "☀️";
         case(weatherId >= 801 && weatherId <= 804):
        return "☁️";
        default:
            return "🤔";
    }

}
function displayError(message){
    card.textContent = "";

const errorDisplay = document.createElement("p");
errorDisplay.textContent = message;
errorDisplay.classList.add("errorDisplay");



card.classList.remove('visible');
setTimeout(() => {
    card.classList.add('visible');
}, 0);
// card.style.justifyContent= "center";
// card.style.alignItems = "center";   


card.appendChild(errorDisplay);
}
//console.log("Form:" , weatherForm);
//console.log("Input:", cityInput);
//console.log("Card:", card);
});