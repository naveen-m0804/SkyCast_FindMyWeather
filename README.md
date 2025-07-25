# SkyCast - Find My Weather
## Date: 19-07-2025
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:
```js
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OPEN_WEATHER_API_KEY = "bd5e378503939ddaee76f12ad7a97608";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCity = sessionStorage.getItem("city");
    if (!storedCity) {
      navigate("/");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    const fetchWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          storedCity
        )}&appid=${OPEN_WEATHER_API_KEY}&units=metric`;
        const response = await axios.get(url);
        setWeather(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("City not found! Try another city.");
        } else if (err.response && err.response.status === 401) {
          setError("Invalid API key.");
        } else {
          setError("Failed to fetch weather data. Try again later.");
        }
      }
      setLoading(false);
    };

    fetchWeather();
  }, [navigate]);

  const temps = useMemo(() => {
    if (!weather) return {};
    const celsius = weather.main.temp;
    const fahrenheit = (celsius * 9) / 5 + 32;
    return {
      celsius: celsius.toFixed(1),
      fahrenheit: fahrenheit.toFixed(1),
    };
  }, [weather]);

  return (
    <div className="container">
      <button className="back-btn" onClick={() => navigate("/")}>⬅ Back</button>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : weather ? (
        <div className="weather-card">
          <h2>
            Weather in {weather.name}, {weather.sys.country}
          </h2>
          <p>
            <strong>Condition:</strong> {weather.weather[0].main} (
            {weather.weather[0].description})
          </p>
          <p>
            <strong>Temperature:</strong> {temps.celsius}°C / {temps.fahrenheit}°F
          </p>
          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {weather.wind.speed} m/s
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
```
## Output:
![alt text](Output1.png) 
![alt text](Output2.png)
## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
