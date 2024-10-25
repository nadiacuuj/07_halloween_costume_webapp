// The initial structure and helper functions (e.g. getCostumeQuery) deployed in this script were drafted with extensive help from AI.

import React, { useState } from "react";
import axios from "axios";
import CostumeSuggestion from "./components/CostumeSuggestion";
import "./App.css";

function App() {
  // State variables for city input, weather data, costume images, and error handling
  const [city, setCity] = useState(""); // Stores the city name entered by the user
  const [weather, setWeather] = useState(null); // Stores weather data for the city
  const [costumeImages, setCostumeImages] = useState([]); // Stores costume images based on weather
  const [cityNotFound, setCityNotFound] = useState(false); // Boolean state to manage city not found errors

  // Event handler for city input change
  const handleCityChange = (event) => {
    setCity(event.target.value); // Updates the city state whenever input changes
  };

  // Helper function to generate costume query based on temperature and weather condition
  // AI-assisted: Suggested query terms for costume types based on temperature/weather conditions
  function getCostumeQuery(temp, weatherCondition) {
    let query = 'halloween costume ';

    // Add terms based on temperature for appropriate costume suggestions
    if (temp > 30) {
      query += 'light cool breathable'; // For hot weather
    } else if (temp >= 15 && temp <= 30) {
      query += 'comfortable regular'; // For mild weather
    } else if (temp < 15) {
      query += 'warm layered'; // For cold weather
    }

    // Modify query for specific weather conditions
    if (weatherCondition.includes("cloud")) {
      query += 'cloudy spooky';
    } else if (weatherCondition.includes("rain")) {
      query += 'rainy outdoor';
    } else if (weatherCondition.includes("clear")) {
      query += 'clear skies';
    } else if (weatherCondition.includes("snow")) {
      query += 'snow warm cozy';
    }

    query += 'costumes'; // Final keyword for costume suggestions
    return query; // Return the complete query string
  }

  // Fetches costume images from the Unsplash API using the generated query
  async function fetchCostumeImages(temp, weatherDescription) {
    const query = getCostumeQuery(temp, weatherDescription); // Generate query based on temp and weather
    try {
      // Makes an API call to Unsplash with the query and access key
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      );
      setCostumeImages(response.data.results); // Sets costume images in state
    } catch (error) {
      console.error("Error fetching costume images:", error); // Error handling if API call fails
    }
  }

  // Fetches weather data for a given city from the OpenWeather API
  async function fetchWeatherData(city) {
    try {
      // OpenWeather API call to get weather information for the specified city
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=metric`
      );
      
      console.log(response.data); // Log weather data for debugging and verification

      if (response.status === 200) {
        const weatherData = response.data; // Store the response data for easier access
        const temp = weatherData.main.temp; // Access temperature data

        // Check that the weather description exists in the response to avoid errors
        if (weatherData && weatherData.weather && weatherData.weather[0].description) {
          const weatherDescription = weatherData.weather[0].description;
          
          // Update the state with fetched weather data
          setWeather({
            temperature: temp,
            description: weatherDescription,
          });

          setCityNotFound(false); // Reset city not found error if data is valid
          fetchCostumeImages(temp, weatherDescription); // Fetch costume images based on weather
        } else {
          console.error("Weather description missing in response"); // Log if weather description is absent
        }
      }
    } catch (error) {
      // Handle errors such as city not found or API rate limit issues
      if (error.response && error.response.status === 429) {
        console.error("API rate limit exceeded"); // Handle rate limit errors
      } else {
        console.error("Error fetching weather data:", error); // General error logging
      }
      setCityNotFound(true); // Set city not found state if an error occurs
    }
  }

  // Form submission handler to trigger the weather and costume data retrieval
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form's default submission behavior
    if (city) {
      fetchWeatherData(city); // Fetch weather data if a city has been entered
    }
  };

  return (
    <div className="App">
      <h1>Halloween Decoration and Costume Suggestions Based on Weather</h1>
      
      {/* Input form for the city name */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange} // Calls handleCityChange on each keystroke
          placeholder="Enter city"
        />
        <button type="submit">Get Costume Ideas</button>
      </form>

      {/* Displays an error message if the entered city is not found */}
      {cityNotFound && <p className="error">City not found. Please try again.</p>}

      {/* Renders weather and costume suggestions if data is available */}
      {weather && (
        <div>
          <h3>Weather in {city}</h3>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Weather: {weather.description}</p>
          <h3>Decoration Suggestions for {weather.description}</h3>
          <CostumeSuggestion weather={weather} />
        </div>
      )}
    </div>
  );
}

export default App;

/* 
AI Credits:
- AI assistance provided in the initial component structure and state management plan.
- AI also contributed to defining the costume query logic in `getCostumeQuery` and structuring API error handling.
*/