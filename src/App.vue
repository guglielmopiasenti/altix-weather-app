<script setup>
import { ref, onMounted } from 'vue';
import { fetchCurrentWeather, fetchWeatherForecast } from './services/WeatherService';
import useSelectImage from './composables/useSelectImage';
import useGroupByDay from './composables/useGroupByDay';

import SearchBar from './components/SearchBar.vue';
import Sidebar from './components/Sidebar.vue';


const currentWeather = ref(null);
const weatherForecast = ref(null);
const error = ref(null);
const { selectImage } = useSelectImage();
const { groupedForecast } = useGroupByDay(weatherForecast, selectImage);
const isSidebarOpen = ref(false);
const cities = ref([]);
const selectedCity = ref(null);


onMounted(() => {
  searchWeather('Rotterdam');
});

const searchWeather = async (city) => {
  try {
    currentWeather.value = await fetchCurrentWeather(city);
    weatherForecast.value = await fetchWeatherForecast(city);
  } catch (err) {
    error.value = err;
    console.error("Error in App.vue:", err);
  }
};


const handleAddCity = (city) => {
  if (!cities.value.includes(city)) {
    cities.value.push(city);
    fetchCurrentWeather(city);
  }
};

const handleSelectCity = (city) => {
  selectedCity.value = city;
  fetchCurrentWeather(city);
};


</script>


<template>
  <div class="antialiased bg-[url('public/background.jpg')] min-h-screen">
    <!-- Sidebar Component -->
    <div class="relative">
      <!-- Background Overlay -->
      <div class="absolute inset-0 bg-black opacity-25 z-0 min-h-screen"></div>
      <div class="relative">
        <Sidebar :cities="cities" :isOpen="isSidebarOpen" @add-city="handleAddCity" @select-city="handleSelectCity" />
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <!-- header section -->
          <header class="flex items-center justify-center gap-5">
            <h1 class="text-4xl sm:text-6xl py-5 sm:py-10 text-center text-gray-200">WeatherWhiz</h1>
            <img class="max-h-8 md:max-h-14 mt-3" src="/logo.png" alt="">
          </header>
          <div class="flex items-center justify-end gap-5">
            <button @click="isSidebarOpen = !isSidebarOpen"
              class="p-2 bg-gray-200 hover:bg-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <SearchBar :defaultCity="'Rotterdam'" @search="searchWeather" />
          </div>

          <!-- main section -->
          <main>
            <div class="bg-gray-300 rounded-lg py-5 sm:py-10 px-3 sm:px-5">
              <div v-if="currentWeather">
                <h1 class="text-2xl sm:text-3xl pb-5 sm:pb-10">Current Weather in {{ currentWeather.name }}</h1>
                <p>{{ currentWeather.main.temp }}°C - {{ currentWeather.weather[0].description }}</p>
              </div>
            </div>

            <!-- grouped forecast -->
            <div class="py-10 sm:py-20" v-if="groupedForecast">
              <h2 class="text-xl sm:text-2xl py-5 sm:py-10 text-gray-200 font-bold">5 Day Forecast</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                <div
                  class="forecast-card bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg shadow-lg p-5"
                  v-for="(day, index) in groupedForecast" :key="index">
                  <div class="grid grid-cols-2 md-gap-5 md-pb-5">
                    <h3 class="text-lg">{{ day.date }}</h3>
                    <img class="max-h-16 justify-self-end" :src="day.imageUrl" alt="Weather Image">
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
