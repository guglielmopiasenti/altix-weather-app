export default function useSelectBackgroundColor(condition) {
  const selectBackgroundColor = (condition) => {
    let backgroundColorClass = "";

    switch (condition.toLowerCase()) {
      case "clear sky":
        backgroundColorClass =
          "bg-gradient-to-r from-sky-400/40 to-blue-300/40 backdrop-filter backdrop-blur-sm";
        break;
      case "few clouds":
      case "scattered clouds":
        backgroundColorClass =
          "bg-gradient-to-r from-gray-50/40 to-sky-400/40 backdrop-filter backdrop-blur-sm";
        break;
      case "broken clouds":
      case "overcast clouds":
        backgroundColorClass =
          "bg-gradient-to-r from-gray-500/40 to-gray-400/40 backdrop-filter backdrop-blur-sm";
        break;
      case "shower rain":
      case "light intensity shower rain":
      case "heavy intensity shower rain":
      case "ragged shower rain":
        backgroundColorClass =
          "bg-gradient-to-r from-gray-500/40 to-gray-400/40 backdrop-filter backdrop-blur-sm";
        break;
      case "light rain":
      case "moderate rain":
      case "heavy intensity rain":
      case "very heavy rain":
      case "extreme rain":
        backgroundColorClass =
          "bg-gradient-to-r from-gray-500/40 to-gray-400/40 backdrop-filter backdrop-blur-sm";
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
        backgroundColorClass =
          "bg-gradient-to-r from-gray-600/40 to-gray-500/40 backdrop-filter backdrop-blur-sm";
        break;
      case "snow":
      case "light snow":
      case "heavy snow":
        backgroundColorClass =
          "bg-gradient-to-r from-gray-500/40 to-gray-400/40 backdrop-filter backdrop-blur-sm";
        break;
      case "sleet":
      case "light shower sleet":
      case "shower sleet":
      case "light rain and snow":
      case "rain and snow":
      case "light shower snow":
      case "shower snow":
      case "heavy shower snow":
        backgroundColorClass =
          "bg-gradient-to-r from-gray-500/40 to-gray-400/40 backdrop-filter backdrop-blur-sm";
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
        backgroundColorClass =
          "bg-gradient-to-r from-gray-500/40 to-gray-400/40 backdrop-filter backdrop-blur-sm";
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
        backgroundColorClass =
          "bg-gradient-to-r from-gray-500/40 to-gray-400/40 backdrop-filter backdrop-blur-sm";
        break;
      case "freezing rain":
        backgroundColorClass =
          "bg-gradient-to-r from-gray-500/40 to-gray-400/40 backdrop-filter backdrop-blur-sm";
        break;
      case "windy":
        backgroundColorClass =
          "bg-gradient-to-r from-gray-500/40 to-gray-400/40 backdrop-filter backdrop-blur-sm";
        break;
      default:
        backgroundColorClass =
          "bg-gradient-to-r from-gray-500/40 to-gray-400/40 backdrop-filter backdrop-blur-sm";
        break;
    }
    return backgroundColorClass;
  };

  return { selectBackgroundColor };
}
