import axios from "axios";

// API endpoints and key for OpenWeatherMap
const CURRENT_WEATHER_API_URL =
  "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "3273650f64275c06b4e93f1c01ac9523";

// Fetches current weather data for a specified city
export const fetchCurrentWeather = async (city, unit = "metric") => {
  try {
    // Request current weather data from OpenWeatherMap API
    const response = await axios.get(
      `${CURRENT_WEATHER_API_URL}?q=${city}&appid=${API_KEY}&units=${unit}`
    );
    return response.data;
  } catch (error) {
    // Log and propagate error
    console.error("Error fetching current weather data", error);
    throw error;
  }
};

// Fetches weather forecast data for a specified city
export const fetchWeatherForecast = async (city, unit = "metric") => {
  try {
    // Request weather forecast data from OpenWeatherMap API
    const response = await axios.get(
      `${FORECAST_API_URL}?q=${city}&appid=${API_KEY}&units=${unit}`
    );
    return response.data;
  } catch (error) {
    // Log and propagate error
    console.error("Error fetching weather forecast data", error);
    throw error;
  }
};
