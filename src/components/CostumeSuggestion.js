import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CostumeSuggestion.css";

const CostumeSuggestion = ({ weather }) => {
  const [costumes, setCostumes] = useState([]); // State to hold fetched costume images
  const [error, setError] = useState(""); // State to handle errors

  useEffect(() => {
    // Ensure weather data exists before proceeding
    if (!weather || !weather.temperature || !weather.description) {
      setError("Weather data is not available."); // Set error if no weather data
      return;
    }

    // Function to fetch costume images based on weather
    const fetchCostumeImages = async () => {
      try {
        let searchQuery = "Halloween costumes"; // Default search query

        // Customize the search query based on temperature
        if (weather.temperature < 10) {
          searchQuery += " winter costumes"; // Cold weather -> search for winter costumes
        } else if (weather.temperature > 20) {
          searchQuery += " summer costumes"; // Hot weather -> search for summer costumes
        } else {
          // Moderate weather -> use weather description to enhance query
          searchQuery += ` ${weather.description.toLowerCase()} costumes`;
        }

        // Fetch images from Unsplash API using the query
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
        );

        // Set the costume images in the state
        setCostumes(response.data.results);
        setError(""); // Clear any previous error messages if successful
      } catch (err) {
        setError("Failed to load costume images."); // Handle any errors from API requests
      }
    };

    fetchCostumeImages(); // Trigger the image fetch on weather change
  }, [weather]); // The effect runs whenever the 'weather' prop changes

  return (
    <div>
      {/* Show the weather condition in the heading */}
      {weather && weather.description ? (
        <h3>Costume Suggestions for {weather.description}</h3>
      ) : (
        <h3>Costume Suggestions</h3>
      )}

      {/* Display error message if fetching images fails */}
      {error && <p className="error">{error}</p>}

      {/* Display the fetched costume images */}
      <div className="costume-grid">
        {costumes.length > 0 ? (
          costumes.map((costume) => (
            <div key={costume.id} className="costume-item">
              {/* Use the small-sized image from Unsplash */}
              <img src={costume.urls.small} alt={costume.alt_description || "Costume"} />
            </div>
          ))
        ) : (
          <p>No costume images available.</p> // Show message if no images are found
        )}
      </div>
    </div>
  );
};

export default CostumeSuggestion;
