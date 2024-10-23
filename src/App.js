import React, { useState } from "react";
import axios from "axios";
import CostumeSuggestion from "./components/CostumeSuggestion";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [costumeImages, setCostumeImages] = useState([]);
  const [cityNotFound, setCityNotFound] = useState(false);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  // Function to generate costume-specific query based on weather
  function getCostumeQuery(temp, weatherCondition) {
    let query = 'halloween costume ';

    // Adding temperature logic for costume types
    if (temp > 30) {
      query += 'light cool breathable'; // Hot weather
    } else if (temp >= 15 && temp <= 30) {
      query += 'comfortable regular'; // Mild weather
    } else if (temp < 15) {
      query += 'warm layered'; // Cold weather
    }

    // Adding weather condition keywords
    if (weatherCondition.includes("cloud")) {
      query += 'cloudy spooky';
    } else if (weatherCondition.includes("rain")) {
      query += 'rainy outdoor';
    } else if (weatherCondition.includes("clear")) {
      query += 'clear skies';
    } else if (weatherCondition.includes("snow")) {
      query += 'snow warm cozy';
    }

    query += 'costumes'; // Final part of query for costumes
    return query;
  }

  // Fetch costume images from Unsplash
  async function fetchCostumeImages(temp, weatherDescription) {
    const query = getCostumeQuery(temp, weatherDescription);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
      );
      setCostumeImages(response.data.results);
    } catch (error) {
      console.error("Error fetching costume images:", error);
    }
  }

  // Fetch weather data from OpenWeather API
  async function fetchWeatherData(city) {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}&units=metric`
      );

      if (response.status === 200) {
        const weatherData = response.data;
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;

        // Set weather info
        setWeather({
          temperature: temp,
          description: weatherDescription,
        });

        setCityNotFound(false); // City is found, no error

        // Fetch costume images based on weather data
        fetchCostumeImages(temp, weatherDescription);
      }
    } catch (error) {
      setCityNotFound(true); // City not found
      console.error("City not found:", error);
    }
  }

  // Handle form submission to get costume ideas
  const handleSubmit = (event) => {
    event.preventDefault();
    if (city) {
      fetchWeatherData(city);
    }
  };

  return (
    <div className="App">
      <h1>Halloween Costume Suggestions Based on Weather</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button type="submit">Get Costume Ideas</button>
      </form>

      {cityNotFound && <p className="error">City not found. Please try again.</p>}

      {weather && (
        <div>
          <h3>Weather in {city}</h3>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Weather: {weather.description}</p>
          <h3>Costume Suggestions for {weather.description}</h3>
          <CostumeSuggestion costumeImages={costumeImages} />
        </div>
      )}
    </div>
  );
}

export default App;
