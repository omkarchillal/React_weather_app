import "./App.css";
import Search from "./components/search/search";
import Forecast from "./components/forecast/forecast";
import CurrentWeather from "./components/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState, useEffect } from "react";

function App() {
  // State to store current weather and forecast
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [networkType, setNetworkType] = useState("unknown");

  // Reusable function to fetch current weather and forecast data
  const fetchWeatherData = (lat, lon, label) => {
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    // Wait for both responses and update state
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: label, ...weatherResponse });
        setForecast({ city: label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  // Triggered when the user selects a city from the search input
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    fetchWeatherData(lat, lon, searchData.label);
  };

  // Geolocation API - fetch weather data for user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeatherData(lat, lon, "Current Location");
        },
        (error) => {
          console.warn("Geolocation failed:", error.message);
        }
      );
    }
  }, []);

  // Network Information API - detect and display connection/network type
  useEffect(() => {
    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const updateNetworkStatus = () => {
      if (connection && connection.effectiveType) {
        setNetworkType(connection.effectiveType);
      } else {
        setNetworkType("unknown");
      }
    };

    updateNetworkStatus();

    // Listen for changes in connection type
    if (connection) {
      connection.addEventListener("change", updateNetworkStatus);
    }

    // Cleanup listener on unmount
    return () => {
      if (connection) {
        connection.removeEventListener("change", updateNetworkStatus);
      }
    };
  }, []);

  // Intersection Observer API - animate elements when they enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".weather, .daily-item");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentWeather, forecast]);

  return (
    <div className="container">
      {/* City search input */}
      <Search onSearchChange={handleOnSearchChange} />

      {/* Display user's network type */}
      <div className="network-status">
        🌐 Network: <strong>{networkType}</strong>
      </div>

      {/* Current weather card */}
      {currentWeather && <CurrentWeather data={currentWeather} />}

      {/* Forecast for next 7 days */}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
