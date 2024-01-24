// const apiKey = "f999623991b240d5d123babe2b68227d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=f999623991b240d5d123babe2b68227d&q=";
const defaultCity = "Delhi";

const searchBox = document.querySelector("#search input")
const searchBtn = document.querySelector("#search button")
const weatherIcon = document.querySelector("#weather-icon")
const popup = document.querySelector("#popup");

searchBox.value = defaultCity;

async function checkWeather(city) {
    const response = await fetch(apiUrl + city);

    if (response.status == 404) {
        document.querySelector("#container").style.visibility = "hidden";
        popup.classList.add("open-popup");

        let close = document.getElementById("btn2");
        close.addEventListener("click", () => {
            popup.classList.remove("open-popup");
            document.querySelector("#container").style.visibility = "visible";
            document.querySelector("#weather").style.display = "none";
        })

    }
    var data = await response.json();
    // console.log(data)

    document.querySelector("#city").innerHTML = data.name;
    document.querySelector("#temp").innerHTML = data.main.temp.toFixed(1) + "°c";
    document.querySelector("#humidity").innerHTML = data.main.humidity + "%";
    document.querySelector("#wind").innerHTML = data.wind.speed + " km/hr";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png"
    }
    else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png"
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png"
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png"
    }
    else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png"
    }
    else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png"
    }
    else if (data.weather[0].main == "Smoke" || "Haze" || "Fog") {
        weatherIcon.src = "images/smoke.png"
    }
}

window.addEventListener("load", () => {
    checkWeather(defaultCity);
});

searchBtn.addEventListener("click", () => {
    document.querySelector("#weather").style.display = "block";
    checkWeather(searchBox.value);
})
