const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const humdity = document.querySelector(".humdity");
const wind = document.querySelector(".wind");
const button = document.querySelector("#search-btn");

const apiKey = "0b152ce4ed600ca156b6c0091e24579c";

button.addEventListener("click", function () {
  const input = document.querySelector(".search-bar").value;
  getCity(input);
});

function getCity(c) {
  fetch("https://ipapi.co/json")
    .then((res) => res.json())
    .then((data) => geoLocation(data));
  function geoLocation(val) {
    let place = val.city;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        val?.latitude
      }&lon=${val?.longitude}&appid=${apiKey}&q=${c === undefined ? place : c}`
    )
      .then((res) => res.json())
      .then((data) => weatherData(data));
  }
  geoLocation();
}
getCity();

function weatherData(d) {
  console.log(d);
  let temperature = Math.round(d.main.temp - 273.15);
  let desc = d.weather[0].main;

  // Temperature Color
  if (temperature <= 0) {
    temp.style.color = "lightblue";
  }
  if (temperature < 10) {
    temp.style.color = "skyblue";
  }
  if (temperature > 10) {
    temp.style.color = "yellowgreen";
  }
  if (temperature > 20) {
    temp.style.color = "orange";
  }
  if (temperature > 30) {
    temp.style.color = "crimson";
  }

  // Background Image
  if (desc)
    switch (desc) {
      case "Smoke":
        document.body.style.backgroundImage = "url(./img/smoke.jpg)";
        break;
      case "Clouds":
        document.body.style.backgroundImage = "url(./img/cloud.jpg)";
        break;
      case "Clear":
        document.body.style.backgroundImage = "url(./img/clear.jpg)";
        break;
      case "Sunny":
        document.body.style.backgroundImage = "url(./img/sunny.jpg)";
        break;
      case "Dust":
        document.body.style.backgroundImage = "url(./img/dust.jpg)";
        break;
      case "Rainy":
        document.body.style.backgroundImage = "url(./img/rain.jpg)";
        break;
      case "Haze":
        document.body.style.backgroundImage = "url(./img/haze.jpg)";
        break;

      default:
        document.body.style.backgroundImage = "url(./img/weather.jpg)";
    }

  //Card Data
  city.innerHTML = d.name;
  temp.innerHTML = `${temperature}° c`;
  description.innerHTML = desc;
  humdity.innerHTML = `<b>Humidity:</b> ${d.main.humidity}%`;
  wind.innerHTML = `<b>Wind-speed:</b> ${d.wind.speed} km/h`;
}

weatherData();
