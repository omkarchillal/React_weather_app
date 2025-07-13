Weather App – API Usage Documentation
This document describes all the web APIs and third-party services used in the Weather App project.

✅ 1. Geolocation API
Type: Web API (built into the browser)

Used In: App.js

Purpose: Automatically retrieves the user's geographic location (latitude and longitude) when the app loads.

Use Case: Used to fetch and display current weather and forecast without requiring manual input.

Fallback: If geolocation fails or is denied, the user can manually search for their city.



navigator.geolocation.getCurrentPosition(
  (position) => {
    // Use position.coords.latitude and position.coords.longitude
  },
  (error) => {
    // Handle geolocation error
  }
);


✅ 2. Network Information API
Type: Web API

Used In: App.js

Purpose: Detects the user’s network connection type such as wifi, 4g, 3g, 2g, or slow-2g.

Use Case: Displays the network type in the UI and optionally warns the user if the connection is slow.

const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const type = connection?.effectiveType; // e.g., '4g'

Displayed In: The top section of the app UI as:

Network type : 4g


✅ 3. Intersection Observer API
Type: Web API

Used In: App.js

Purpose: Observes when elements like the current weather block and forecast items scroll into view.

Use Case: Adds a fade-in animation effect to .weather and .daily-item sections as they enter the viewport.

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
});

document.querySelectorAll('.weather, .daily-item').forEach(el => observer.observe(el));


✅ 4. GeoDB Cities API (via RapidAPI)
Type: 3rd-party REST API

Used In: search.js

Purpose: Provides city autocomplete suggestions as the user types.

Use Case: Enables manual search for weather by city name. On selection, it provides coordinates that are used to fetch weather data.

fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)

Data Source: GeoDB Cities API on RapidAPI



📊 API Summary Table

| API Name                  | Type          | Purpose                                     |
| ------------------------- | ------------- | ------------------------------------------- |
| Geolocation API           | Web API       | Auto-fetch location for weather             |
| Network Info API          | Web API       | Show user's connection type                 |
| Intersection Observer API | Web API       | Animate elements on scroll                  |
| GeoDB Cities API          | 3rd-party API | Enable manual city search with autocomplete |


