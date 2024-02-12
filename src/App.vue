<script setup>
import { ref } from 'vue';
import { fetchCurrentWeather, fetchWeatherForecast } from './services/WeatherService';
import { computed } from 'vue';

const currentWeather = ref(null);
const weatherForecast = ref(null);
const error = ref(null);
const city = ref('Rotterdam');

const searchWeather = async () => {
  try {
    currentWeather.value = await fetchCurrentWeather(city.value);
    weatherForecast.value = await fetchWeatherForecast(city.value);
  } catch (err) {
    error.value = err;
    console.error("Error in App.vue:", err);
  }
};

searchWeather();


function groupByDay(forecastList) {
  const grouped = forecastList.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return Object.keys(grouped).map(date => {
    const dailyItems = grouped[date];
    const avgTemp = dailyItems.reduce((sum, item) => sum + item.main.temp, 0) / dailyItems.length;
    const condition = dailyItems[Math.floor(dailyItems.length / 2)].weather[0].description;

    return { date, avgTemp: avgTemp.toFixed(2), condition };
  });

}
const groupedForecast = computed(() => {
  if (weatherForecast.value && weatherForecast.value.list) {
    return groupByDay(weatherForecast.value.list);
  }
  return [];
});
</script>


<template>
  <div class="antialiased">

    <div class="container mx-auto py-10">
      <!-- header section -->
      <header>
        <h1 class="text-6xl py-10 text-center">WeatherWhiz</h1>
      </header>

      <div class="flex items-center justify-end mt-5">
        <div class="flex rounded-full bg-[#0d1829] px-2 max-w-[400px] shadow-lg">
          <button class="self-center flex p-1 cursor-pointer bg-[#0d1829]"> <svg width="30px" height="30px"
              viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

              <g id="SVGRepo_iconCarrier">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.567 9.8895C12.2495 8.90124 12.114 7.5637 11.247 6.7325C10.3679 5.88806 9.02339 5.75928 7.99998 6.4215C7.57983 6.69308 7.25013 7.0837 7.05298 7.5435C6.85867 7.99881 6.80774 8.50252 6.90698 8.9875C7.00665 9.47472 7.25054 9.92071 7.60698 10.2675C7.97021 10.6186 8.42786 10.8563 8.92398 10.9515C9.42353 11.049 9.94062 11.0001 10.413 10.8105C10.8798 10.6237 11.2812 10.3033 11.567 9.8895Z"
                  stroke="#ff5c5c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M12.433 17.8895C11.7504 16.9012 11.886 15.5637 12.753 14.7325C13.6321 13.8881 14.9766 13.7593 16 14.4215C16.4202 14.6931 16.7498 15.0837 16.947 15.5435C17.1413 15.9988 17.1922 16.5025 17.093 16.9875C16.9933 17.4747 16.7494 17.9207 16.393 18.2675C16.0298 18.6186 15.5721 18.8563 15.076 18.9515C14.5773 19.0481 14.0614 18.9988 13.59 18.8095C13.1222 18.6234 12.7197 18.3034 12.433 17.8895V17.8895Z"
                  stroke="#ff5c5c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M12 7.75049C11.5858 7.75049 11.25 8.08627 11.25 8.50049C11.25 8.9147 11.5858 9.25049 12 9.25049V7.75049ZM19 9.25049C19.4142 9.25049 19.75 8.9147 19.75 8.50049C19.75 8.08627 19.4142 7.75049 19 7.75049V9.25049ZM6.857 9.25049C7.27121 9.25049 7.607 8.9147 7.607 8.50049C7.607 8.08627 7.27121 7.75049 6.857 7.75049V9.25049ZM5 7.75049C4.58579 7.75049 4.25 8.08627 4.25 8.50049C4.25 8.9147 4.58579 9.25049 5 9.25049V7.75049ZM12 17.2505C12.4142 17.2505 12.75 16.9147 12.75 16.5005C12.75 16.0863 12.4142 15.7505 12 15.7505V17.2505ZM5 15.7505C4.58579 15.7505 4.25 16.0863 4.25 16.5005C4.25 16.9147 4.58579 17.2505 5 17.2505V15.7505ZM17.143 15.7505C16.7288 15.7505 16.393 16.0863 16.393 16.5005C16.393 16.9147 16.7288 17.2505 17.143 17.2505V15.7505ZM19 17.2505C19.4142 17.2505 19.75 16.9147 19.75 16.5005C19.75 16.0863 19.4142 15.7505 19 15.7505V17.2505ZM12 9.25049H19V7.75049H12V9.25049ZM6.857 7.75049H5V9.25049H6.857V7.75049ZM12 15.7505H5V17.2505H12V15.7505ZM17.143 17.2505H19V15.7505H17.143V17.2505Z"
                  fill="#ff5c5c" />
              </g>

            </svg></button>

          <input v-model="city" @keyup.enter="searchWeather" type="text" class="w-full bg-[#0d1829] flex bg-transparent pl-2 text-[#cccccc] outline-0"
            placeholder="Enter city name" />
          <button type="submit" class="relative p-2 bg-[#0d1829] rounded-full">
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

              <g id="SVGRepo_iconCarrier">
                <path
                  d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </g>

            </svg>
          </button>
        </div>
      </div>


      <!-- main section -->
      <main>
        <div class="bg-gray-300 rounded-lg">
          <div v-if="currentWeather">
            <h1 class="text-3xl mt-20 pb-10">Current Weather in {{ currentWeather.name }}</h1>
            <p>{{ currentWeather.main.temp }}°C - {{ currentWeather.weather[0].description }}</p>
          </div>
        </div>

        <!-- grouped forecast -->
        <div class="py-40" v-if="groupedForecast">
          <h2 class="text-2xl py-10">5-Day Forecast</h2>
          <div class="grid grid-cols-6 gap-10">
            <div class="py-3 px-5 bg-gray-400 rounded-lg shadow-lg" v-for="(day, index) in groupedForecast" :key="index">
              <h3>{{ day.date }}</h3>
              <p>Average Temperature: {{ day.avgTemp }}°C</p>
              <p>Condition: {{ day.condition }}</p>
            </div>
          </div>
        </div>

      <p v-if="error">{{ error.message }}</p>
    </main>
  </div>

  <!-- footer section -->

</div></template>

<style scoped></style>
