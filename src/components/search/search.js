import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate"; // Dropdown component with async loading
import { GEO_API_URL, geoApiOptions } from "../../api"; // Apis and urls

// Search component for city input
const Search = ({ onSearchChange }) => {
  // Local state to track the current selected city
  const [search, setSearch] = useState(null);

  // Function to load city options based on user input
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        // Map the API response to value-label pairs for dropdown
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`, // Used for fetching weather data
              label: `${city.name}, ${city.countryCode}`, // Displayed in dropdown
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  // Handle when a city is selected
  const handleOnChange = (searchData) => {
    setSearch(searchData); // Update local search state
    onSearchChange(searchData); // Trigger parent handler to fetch weather
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600} // Wait before sending API call
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions} // Function to load search results
    />
  );
};

export default Search;
