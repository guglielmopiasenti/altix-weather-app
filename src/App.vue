<script setup>
import { ref } from 'vue';
import { fetchCurrentWeather, fetchWeatherForecast } from './services/WeatherService';
import useSelectImage from './composables/useSelectImage';
import useGroupByDay from './composables/useGroupByDay';


const currentWeather = ref(null);
const weatherForecast = ref(null);
const error = ref(null);
const city = ref('Rotterdam');
const { selectImage } = useSelectImage();
const { groupedForecast } = useGroupByDay(weatherForecast, selectImage);

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


</script>


<template>
  <div class="antialiased bg-[url('public/background.jpg')] min-h-screen">
    <div class="relative">
      <!-- Background Overlay -->
      <div class="absolute inset-0 bg-black opacity-25 z-0 min-h-screen"></div>
      <div class="relative">
        <div class="container mx-auto py-10">
          <!-- header section -->
          <header class="flex items-center justify-center gap-5">
            <h1 class="text-6xl py-10 text-center text-gray-200">WeatherWhiz</h1>
            <img class="max-h-14 mt-3" src="/logo.png" alt="">
          </header>

          <div class="flex items-center justify-end my-10">
            <div class="flex rounded-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm px-2 max-w-[400px] shadow-lg">
              <input v-model="city" @keyup.enter="searchWeather" type="text"
                class="w-full flex bg-transparent pl-2 text-gray-200 outline-0"
                placeholder="Enter city name" />
              <button type="submit" class="relative p-2">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="#555" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" />
                  </g>

                </svg>
              </button>
            </div>
          </div>


          <!-- main section -->
          <main>
            <div class="bg-gray-300 rounded-lg py-10 px-5">
              <div v-if="currentWeather">
                <h1 class="text-3xl pb-10">Current Weather in {{ currentWeather.name }}</h1>
                <p>{{ currentWeather.main.temp }}°C - {{ currentWeather.weather[0].description }}</p>
              </div>
            </div>

            <!-- grouped forecast -->
            <div class="py-20" v-if="groupedForecast">
              <h2 class="text-2xl py-10 text-gray-200 font-bold">5 Day Forecast</h2>
              <div class="grid grid-cols-5 gap-10">
                <div
                  class="forecast-card bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg shadow-lg p-5"
                  v-for="(day, index) in groupedForecast" :key="index">
                  <div class="grid grid-cols-2 gap-5 pb-5">
                    <h3 class="text-lg">{{ day.date }}</h3>
                    <img class="max-h-16" :src="day.imageUrl" alt="Weather Image">
                  </div>
                  <p class="font-light">Avg Temp: <span class="font-normal">{{ day.avgTemp }}°C</span></p>
                  <p class="font-light">Condition: <span class="font-normal">{{ day.condition }}</span></p>
                </div>
              </div>
            </div>

            <p v-if="error">{{ error.message }}</p>
          </main>
        </div>
      </div>
    </div>

    <!-- footer section -->

  </div>
</template>

<style scoped></style>
