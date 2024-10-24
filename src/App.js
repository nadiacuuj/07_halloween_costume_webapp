import React, { useState } from "react";
import axios from "axios";
import CostumeSuggestion from "./components/CostumeSuggestion";
import "./App.css";

function App() {
  // State variables for city, weather, costume images, and error handling
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [costumeImages, setCostumeImages] = useState([]);
  const [cityNotFound, setCityNotFound] = useState(false);

  // Handles the input change to store the city name
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  // Function to generate the Unsplash query based on temperature and weather condition
  function getCostumeQuery(temp, weatherCondition) {
    let query = 'halloween costume ';

    // Adjust query based on temperature range
    if (temp > 30) {
      query += 'light cool breathable'; // Hot weather
    } else if (temp >= 15 && temp <= 30) {
      query += 'comfortable regular'; // Mild weather
    } else if (temp < 15) {
      query += 'warm layered'; // Cold weather
    }

    // Adjust query based on weather condition (e.g., cloudy, rainy, clear)
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
    return query;
  }

  // Fetch costume images from Unsplash API based on the query generated
  async function fetchCostumeImages(temp, weatherDescription) {
    const query = getCostumeQuery(temp, weatherDescription);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      );
      setCostumeImages(response.data.results); // Store the costume images in the state
    } catch (error) {
      console.error("Error fetching costume images:", error);
    }
  }

  // Fetch weather data from OpenWeather API based on the city input
  async function fetchWeatherData(city) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=metric`
      );
      
      console.log(response.data); // Log the weather data to inspect the response

      if (response.status === 200) {
        const weatherData = response.data;
        const temp = weatherData.main.temp;

        // Ensure weather description exists to avoid errors
        if (weatherData && weatherData.weather && weatherData.weather[0].description) {
          const weatherDescription = weatherData.weather[0].description;
          
          // Set the weather data in the state
          setWeather({
            temperature: temp,
            description: weatherDescription,
          });

          setCityNotFound(false); // If city is found, no error
          fetchCostumeImages(temp, weatherDescription); // Fetch costumes based on weather
        } else {
          console.error("Weather description missing in response");
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Handle the API rate limit exceeded error
        console.error("API rate limit exceeded");
      } else {
        console.error("Error fetching weather data:", error);
      }
      setCityNotFound(true); // Set an error state if city not found
    }
  }

  // Handle form submission to trigger the weather and costume search
  const handleSubmit = (event) => {
    event.preventDefault();
    if (city) {
      fetchWeatherData(city); // Fetch weather data for the entered city
    }
  };

  return (
    <div className="App">
      <h1>Halloween Decoration and Costume Suggestions Based on Weather</h1>
      
      {/* Form to input the city name */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button type="submit">Get Costume Ideas</button>
      </form>

      {/* Display error message if the city is not found */}
      {cityNotFound && <p className="error">City not found. Please try again.</p>}

      {/* Display weather and costume suggestions if data is available */}
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
