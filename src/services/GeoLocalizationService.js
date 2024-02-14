import axios from "axios";

const REVERSE_GEOCODING_API_URL =
  "https://api.opencagedata.com/geocode/v1/json?";
const GEOCODING_API_KEY = "c8a27372b3db4e49982314664fdbe567";

export const fetchLocationByCoords = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${REVERSE_GEOCODING_API_URL}`, {
      params: {
        q: `${latitude}+${longitude}`,
        key: GEOCODING_API_KEY,
        language: "en",
        pretty: 1,
      },
    });
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
    throw new Error("Location not found");
  } catch (error) {
    console.error("Error fetching location by coordinates", error);
    throw error;
  }
};
