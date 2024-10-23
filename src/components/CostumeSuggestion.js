import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CostumeSuggestion.css";

const CostumeSuggestion = ({ weather }) => {
  const [costumes, setCostumes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCostumeImages = async () => {
      try {
        let searchQuery = "Halloween costumes";

        if (weather.temperature < 10) {
          searchQuery += " winter costumes";
        } else if (weather.temperature > 20) {
          searchQuery += " summer costumes";
        } else {
          searchQuery += ` ${weather.condition.toLowerCase()} costumes`;
        }

        const response = await axios.get(
          `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
        );
        setCostumes(response.data.results);
        setError("");
      } catch (err) {
        setError("Failed to load costume images.");
      }
    };

    fetchCostumeImages();
  }, [weather]);

  return (
    <div>
      <h3>Costume Suggestions for {weather.condition}</h3>
      {error && <p className="error">{error}</p>}
      <div className="costume-grid">
        {costumes.map((costume) => (
          <div key={costume.id} className="costume-item">
            <img src={costume.urls.small} alt={costume.alt_description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CostumeSuggestion;
