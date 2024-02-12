import axios from "axios";

const API_URL = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = "3273650f64275c06b4e93f1c01ac9523";
export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(`${API_URL}?q=${city}&appid=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data", error);
    throw error;
  }
};
