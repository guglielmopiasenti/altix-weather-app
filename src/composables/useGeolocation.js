import { ref } from "vue";
import { fetchLocationByCoords } from "../services/GeoLocalizationService";

// Provides geolocation functionality.
export default function useGeolocation() {
  const coords = ref({ latitude: null, longitude: null });
  const city = ref(null);
  const error = ref(null);

  // Retrieves user's location and fetches corresponding city name.
  const getLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          coords.value = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          try {
            city.value = await fetchLocationByCoords(
              coords.value.latitude,
              coords.value.longitude
            );
          } catch (err) {
            error.value = err;
          }
        },
        (err) => {
          error.value = err;
        }
      );
    } else {
      error.value = new Error("Geolocation is not supported by this browser.");
    }
  };

  return { coords, city, error, getLocation };
}
