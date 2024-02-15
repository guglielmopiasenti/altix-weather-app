export default function useSelectImage(condition, icon) {
  const selectImage = (condition, icon) => {
    let imageName = '';

    // Check if it's night
    const isNight = icon.includes("n");

    switch (condition.toLowerCase()) {
      case "clear sky":
        imageName = isNight ? "clear-night" : "sunny";
        break;
      case "few clouds":
      case "scattered clouds":
        imageName = isNight ? "partly-cloudy-night" : "partly-cloudy";
        break;
      case "broken clouds":
      case "overcast clouds":
        imageName = "cloudy";
        break;
      case "shower rain":
      case "light intensity shower rain":
      case "shower rain":
      case "heavy intensity shower rain":
      case "ragged shower rain":
        imageName = "rain";
        break;
      case "light rain":
      case "moderate rain":
      case "heavy intensity rain":
      case "very heavy rain":
      case "extreme rain":
        imageName = "heavy-rain";
        break;
      case "thunderstorm":
      case "thunderstorm with light rain":
      case "thunderstorm with rain":
      case "thunderstorm with heavy rain":
      case "light thunderstorm":
      case "heavy thunderstorm":
      case "ragged thunderstorm":
      case "thunderstorm with light drizzle":
      case "thunderstorm with drizzle":
      case "thunderstorm with heavy drizzle":
        imageName = "thunderstorm";
        break;
      case "snow":
      case "light snow":
      case "heavy snow":
        imageName = "snow";
        break;
      case "sleet":
      case "light shower sleet":
      case "shower sleet":
      case "light rain and snow":
      case "rain and snow":
      case "light shower snow":
      case "shower snow":
      case "heavy shower snow":
        imageName = "sleet";
        break;
      case "mist":
      case "smoke":
      case "haze":
      case "sand/dust whirls":
      case "fog":
      case "sand":
      case "dust":
      case "volcanic ash":
      case "squalls":
      case "tornado":
        imageName = "fog";
        break;
      case "drizzle":
      case "light intensity drizzle":
      case "heavy intensity drizzle":
      case "light intensity drizzle rain":
      case "drizzle rain":
      case "heavy intensity drizzle rain":
      case "shower rain and drizzle":
      case "heavy shower rain and drizzle":
      case "shower drizzle":
        imageName = isNight ? "drizzle-night" : "drizzle";
        break;
      case "freezing rain":
        imageName = "sleet";
        break;
      case "windy":
        imageName = "windy";
        break;
      default:
        imageName = "default";
        break;
    }
    return `/weather/${imageName}.png`;
  };
  return { selectImage };
}
