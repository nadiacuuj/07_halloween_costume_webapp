# Halloween Decoration/Costume Suggestions Based on Weather

For this assignment, I’ve created a web application using React to tackle the semi-regular (or more accurately, annual) challenge of choosing Halloween costumes and decorations that fit both the festive spirit and the unpredictable weather. Living in a place like New York City the past few months has shown just how wildly the weather can fluctuate around Halloween. One day everyone is in puffers, and the next I'm sweating buckets through my t-shirt. This app provides costume and decoration suggestions based on the weather in the user’s city, helping them select outfits and festive décor that are both fun and practical. It’s a creative, timely, and useful solution to a problem that many face every year as Halloween approaches.

## Features

- Fetches current weather data for the entered city using the OpenWeatherMap API.
- Generates costume/decoration images using the Unsplash API, matched to temperature and specific weather conditions like rain, snow, or heat.
- Basic error handling for invalid cities or issues with data fetching.

## Installation and Setup

### Prerequisites
- Node.js installed on your machine.
- API keys from OpenWeatherMap and Unsplash to access weather and image data.

### Steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/nadiacuuj/07_halloween_costume_webapp.git
cd halloween-costume-webapp
```

2. Install the necessary dependencies:

```bash
npm install
```

3. Create a .env file in the project root and add your API keys like this:

```bash
REACT_APP_OPENWEATHER_KEY = your_openweather_api_key
REACT_APP_UNSPLASH_ACCESS_KEY = your_unsplash_api_key
```

4. Start the development server:

```bash
npm start
```

5. The app will run on http://localhost:3000.


## Technologies Used

- React.js for the frontend framework.
- Axios for making HTTP requests to external APIs.
- OpenWeatherMap API for weather data.
- Unsplash API for fetching costume images.

## Error Handling

The project includes basic error handling, such as:
- Displaying an error message if the city entered cannot be found.
- Handling API rate limit errors from OpenWeatherMap.

## Credits for AI-Generated Code

This project was developed with valuable support from AI tools, particularly ChatGPT, in the following ways:

- **Initial Component Structure and API Integration Drafts:** AI provided an initial draft for the component structure and API integration, including setting up the weather data retrieval and costume suggestion functionality. However, although it gave me a very solid layout/general order, the draft also gave me error after error, so I had to manually debug these issues (with the help of more AI) to get the code working correctly.

- **Manual Debugging and Extensive Commenting:** After debugging the AI-drafted code, I added detailed comments manually throughout the code to clarify each part and fully understand how everything functioned. This step was essential for improving readability and helping me keep track of the overall logic.

- **Query Refinement for Costume Suggestions:** Initially, the costume queries generated with AI were overly broad (e.g., "cloudy," "sunny," "rainy"), resulting in similar images for different cities, even if the weather varied significantly. I used AI to help refine the query logic to introduce more specific terms and diversify the images generated. Despite these efforts, the improvements were limited, and diversifying the images for distinct weather scenarios remains a challenge.