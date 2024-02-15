import axios from "axios";

// API endpoint and key for reverse geocoding
const REVERSE_GEOCODING_API_URL =
  "https://api.opencagedata.com/geocode/v1/json?";
const GEOCODING_API_KEY = "c8a27372b3db4e49982314664fdbe567";

// Fetches the location (city/town) name from latitude and longitude using the OpenCage Geocoding API
export const fetchLocationByCoords = async (latitude, longitude) => {
  try {
    // Makes a GET request to the geocoding API with the provided coordinates
    const response = await axios.get(`${REVERSE_GEOCODING_API_URL}`, {
      params: {
        q: `${latitude}+${longitude}`,
        key: GEOCODING_API_KEY,
        language: "en",
        pretty: 1,
      },
    });

    // Checks if the API response contains location data and returns the city or town name
    if (
      response.data &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      return (
        response.data.results[0].components.city ||
        response.data.results[0].components.town
      );
    }

    // Throws an error if no location data is found in the response
    throw new Error("Location not found");
  } catch (error) {
    // Logs and rethrows any errors encountered during the API call
    console.error("Error fetching location by coordinates", error);
    throw error;
  }
};
