document.addEventListener("DOMContentLoaded", async function () {
  const apiKey = "5f885fcd932e41008c761115242108";
  const cityName = "Iligan";
  const apiEndpoint = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}`;

  try {
    const response = await fetch(apiEndpoint); // Wait for the fetch to complete
    const weatherData = await response.json(); // Wait for the response to be parsed into JSON
    console.log(weatherData);

    const weatherContainer = document.getElementById("weather");
    const temperatureInCelsius = weatherData.current.temp_c;
    const weatherDescription = weatherData.current.condition.text;
    const humidityLevel = weatherData.current.humidity;
    const windspeed = weatherData.current.wind_mph;
    const precipitation = weatherData.current.precip_mm;
    const icon = weatherData.current.condition.icon;

    weatherContainer.innerHTML = `
            <h2>${cityName}</h2>
            <p><strong>Temperature:</strong> ${temperatureInCelsius}°C</p>
            <p><strong>Weather:</strong> ${weatherDescription}</p>
            <p><strong>Humidity:</strong> ${humidityLevel}%</p>
            <p><strong>Wind Speed:</strong> ${windspeed}mph</p>
            <p><strong>Precipitation:</strong> ${precipitation}mm</p>
            <p><strong>Condition:</strong> <img src="https:${icon}"></p>
        `;
  } catch (error) {
    const weatherContainer = document.getElementById("weather");
    weatherContainer.innerHTML = `<p>Unable to retrieve weather data: ${error.message}</p>`;
  }
});

async function fetchWeather() {
  // Get the form element and the input field
  const cityInput = document.getElementById("cityInput");
  const cityName = cityInput.value.trim();

  // Ensure the input is not empty
  if (!cityName) {
    alert("Please enter a city name.");
    return;
  }

  const apiKey = "5f885fcd932e41008c761115242108";
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
    cityName
  )}`;

  try {
    // Make the API call
    const response = await fetch(apiUrl);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    // Parse the JSON data
    const data = await response.json();

    // Display the weather result (for demonstration purposes)
    const weather = document.getElementById("weather");
    weather.innerHTML = `
            <h2>${data.location.name}</h2>
            <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
            <p><strong>Weather:</strong> ${data.current.condition.text}</p>
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.current.wind_mph}mph</p>
            <p><strong>Precipitation:</strong> ${data.current.precip_mm}mm</p>
            <p><strong>Condition:</strong> <img src="https:${data.current.condition.icon}"> </p>
        `;
  } catch (error) {
    // Handle errors
    console.error("Error fetching weather data:", error);
    alert("Failed to fetch weather data. Check the console for more details.");
  }
}
