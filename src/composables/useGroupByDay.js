import { computed } from "vue";

// Groups weather forecast data by day.
export default function useGroupByDay(weatherForecast, selectImage) {
  // Organizes forecast data into daily groups and calculates average temperature.
  const groupByDay = (forecastList) => {
    const grouped = forecastList.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    return Object.keys(grouped).map((date) => {
      const dailyItems = grouped[date];
      const avgTemp =
        dailyItems.reduce((sum, item) => sum + item.main.temp, 0) /
        dailyItems.length;
      const weatherItem =
        dailyItems[Math.floor(dailyItems.length / 2)].weather[0];
      const condition = weatherItem.description;
      const icon = weatherItem.icon;

      return {
        date,
        avgTemp: avgTemp.toFixed(2),
        condition: weatherItem.description,
        imageUrl: selectImage(weatherItem.description, weatherItem.icon),
      };
    });
  };

  // Reactive computation of grouped forecast data.
  const groupedForecast = computed(() => {
    return weatherForecast.value && weatherForecast.value.list
      ? groupByDay(weatherForecast.value.list)
      : [];
  });

  return { groupedForecast };
}
