import "./current-weather.css";

// Component to display current weather details
const CurrentWeather = ({ data }) => {
  return (
    <div className="weather">
      {/* Top section: City name and weather icon */}
      <div className="top">
        <div>
          {/* City name */}
          <p className="city">{data.city}</p>

          {/* Weather condition description */}
          <p className="weather-desciption">{data.weather[0].description}</p>
        </div>

        {/* Weather icon */}
        <img alt="weather" className="weather-icon" src={`icons/${data.weather[0].icon}.png`} />
      </div>

      {/* Bottom section: Temperature and other weather details */}
      <div className="bottom">
        {/* Current temperature */}
        <p className="temperature">{Math.round(data.main.temp)}°c</p>

        {/* Weather parameter details */}
        <div className="details">
          <div className="parameter-row">
            <span className="parameter-label">Details</span>
          </div>

          {/* Feels like */}
          <div className="parameter-row">
            <span className="parameter-label">Feels like</span>
            <span className="parameter-value">{Math.round(data.main.feels_like)}°c</span>
          </div>

          {/* Wind speed */}
          <div className="parameter-row">
            <span className="parameter-label">Wind</span>
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>

          {/* Humidity */}
          <div className="parameter-row">
            <span className="parameter-label">Humidity</span>
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>

          {/* Pressure */}
          <div className="parameter-row">
            <span className="parameter-label">Pressure</span>
            <span className="parameter-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
