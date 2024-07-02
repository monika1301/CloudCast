const options = {
      method: "GET",
  headers: {
    "X-Api-Key": "XTSQXeqz6qUyWiXTd7l/Pw==iH37O2J85pNAeILc",
  },
};
async function getLatLongFromCity(cityName) {
  const apiKey = "c6eb794072974ec5ac7e512b1a5018ff";
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      const location = data.results[0].geometry;
      return location;
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
async function getHeadWeather(city) {
  const location = await getLatLongFromCity(city);
  const { lat, lng } = location;

  const weatherUrl = `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lng}`;
  const response = await fetch(weatherUrl, options);
  const weatherData = await response.json();

  // Update the weather data in the table
  const cityNameCell = document.getElementById("cityName");
  const tempCell = document.getElementById("temp");
  const temp2Cell = document.getElementById("temp2");
  const feelsLikeCell = document.getElementById("feels_like");
  const humidityCell = document.getElementById("humidity");
  const humidityCell2 = document.getElementById("humidity2");
  const minTempCell = document.getElementById("min_temp");
  const maxTempCell = document.getElementById("max_temp");
  const windSpeedCell = document.getElementById("wind_speed");
  const windSpeedCell2 = document.getElementById("wind_speed2");
  const windDegreesCell = document.getElementById("wind_degrees");
  const sunriseCell = document.getElementById("sunrise");
  const sunsetCell = document.getElementById("sunset");

  cityNameCell.textContent = city;
  tempCell.textContent = weatherData.temp;
  temp2Cell.textContent = weatherData.temp;
  feelsLikeCell.textContent = weatherData.feels_like;
  humidityCell.textContent = weatherData.humidity;
  humidityCell2.textContent = weatherData.humidity;
  minTempCell.textContent = weatherData.min_temp;
  maxTempCell.textContent = weatherData.max_temp;
  windSpeedCell.textContent = weatherData.wind_speed;
  windSpeedCell2.textContent = weatherData.wind_speed;
  windDegreesCell.textContent = weatherData.wind_degrees;
  sunriseCell.textContent = weatherData.sunrise;
  sunsetCell.textContent = weatherData.sunset;
}

async function getWeather(city) {
  const cityNameElement = document.getElementById("cityName");
  cityNameElement.textContent = city;

  try {
    const location = await getLatLongFromCity(city);
    const { lat, lng } = location;

    const weatherUrl = `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lng}`;
    const response = await fetch(weatherUrl, options);
    const weatherData = await response.json();

    // Update the weather data in the table
    const cityRows = document.querySelectorAll(".cityRow");

    cityRows.forEach((row) => {
      const cityNameCell = row.querySelector(".cityName");
      const tempCell = row.querySelector(".temp");
      const feelsLikeCell = row.querySelector(".feels_like");
      const humidityCell = row.querySelector(".humidity");
      const minTempCell = row.querySelector(".min_temp");
      const maxTempCell = row.querySelector(".max_temp");
      const sunriseCell = row.querySelector(".sunrise");
      const sunsetCell = row.querySelector(".sunset");
      const windDegreesCell = row.querySelector(".wind_degrees");
      const windSpeedCell = row.querySelector(".wind_speed");

      if (cityNameCell.textContent.trim() === city.trim()) {
        tempCell.textContent = weatherData.temp;
        feelsLikeCell.textContent = weatherData.feels_like;
        humidityCell.textContent = weatherData.humidity;
        minTempCell.textContent = weatherData.min_temp;
        maxTempCell.textContent = weatherData.max_temp;
        sunriseCell.textContent = weatherData.sunrise;
        sunsetCell.textContent = weatherData.sunset;
        windDegreesCell.textContent = weatherData.wind_degrees;
        windSpeedCell.textContent = weatherData.wind_speed;
      }
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

const submitButton = document.getElementById("submit");
const cityInput = document.getElementById("city");

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getHeadWeather(city);
  }
});

// Initial load
getWeather("Mumbai");
getWeather("Bangalore");
getWeather("Jaipur");
getWeather("Gandhinagar");
getHeadWeather("Delhi");