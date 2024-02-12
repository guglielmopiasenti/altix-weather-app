import axios from "axios";

const CURRENT_WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "3273650f64275c06b4e93f1c01ac9523";

export const fetchCurrentWeather = async (city) => {
  try {
    const response = await axios.get(
      `${CURRENT_WEATHER_API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current weather data", error);
    throw error;
  }
};

export const fetchWeatherForecast = async (city) => {
  try {
    const response = await axios.get(
      `${FORECAST_API_URL}?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather forecast data", error);
    throw error;
  }
};
