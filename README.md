# Getting Started with Create React App

In this assignment, I’ve created a web application using React to solve the semi-regular (or to be more specific, annual) challenge of choosing a Halloween costume and decorations that suit both the fun spirit of the holiday and the unpredictable weather. By suggesting costume ideas based on the user’s inputted city's weather condition ((e.g., winter costumes for colder temperatures)). This app provides a creative, practical, and timely solution to a problem many face each year as Halloween approaches.

## Features

- Fetches current weather data for the entered city using the OpenWeatherMap API.
- Generates costume/decoration images using the Unsplash API, that match the temperature and specific weather conditions like rain, snow, or heat.
- Simple error handling for invalid cities or issues fetching data.

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

5. The app will be running on http://localhost:3000.


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

This project was developed with valuable support from AI tools, particularly ChatGPT, in the following areas:

- Structuring the integration and handling of API requests, including managing weather data and costume suggestions.
- Crafting dynamic queries for costume recommendations based on specific weather conditions.
- Offering guidance on error handling, debugging, and best practices for improving the code's robustness.
- Providing detailed explanations and comments throughout the code to ensure clarity and maintainability.

While AI assistance greatly enhanced the development process and expedited certain tasks, all key decisions, final code adjustments, and logic implementations were handled manually.

