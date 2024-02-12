import { computed } from "vue";

export default function useGroupByDay(weatherForecast, selectImage) {
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
        condition,
        imageUrl: selectImage(condition, icon),
      };
    });
  };

  const groupedForecast = computed(() => {
    if (weatherForecast.value && weatherForecast.value.list) {
      return groupByDay(weatherForecast.value.list);
    }
    return [];
  });

  return { groupedForecast };
}
