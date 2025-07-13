// GeoDB Cities API configuration (used in Search component)
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "077edf9c82msh76158c42c2f40c2p1773d7jsndb1920ac17dd", // this key is replacable if rate-limited
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

// Base URL for GeoDB Cities API
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// Base URL for OpenWeatherMap API
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";

// OpenWeatherMap API key (used to fetch current weather and 7-day forecast)
export const WEATHER_API_KEY = "0010d0ee1849bf8ef777bf3923520c11"; // make account and replace it with your own key if needed
