<script setup>
// Imports and initial setup
import { ref, onMounted, watch } from 'vue';
import { fetchCurrentWeather, fetchWeatherForecast } from './services/WeatherService';
import useSelectImage from './composables/useSelectImage';
import useGroupByDay from './composables/useGroupByDay';
import useGeolocation from './composables/useGeolocation';
import useSelectBackgroundColor from './composables/useSelectBackgroundColor';
import SearchBar from './components/SearchBar.vue';
import Sidebar from './components/Sidebar.vue';

// Reactive state declarations
const currentWeather = ref(null);
const weatherForecast = ref(null);
const error = ref(null);
const { selectImage } = useSelectImage();
const { groupedForecast } = useGroupByDay(weatherForecast, selectImage);
const isSidebarOpen = ref(false);
const cities = ref([]);
const { city, getLocation } = useGeolocation();
const tempUnit = ref('metric');
const { selectBackgroundColor } = useSelectBackgroundColor();

// Fetch user's location on mount
onMounted(() => {
  getLocation();
});

// Function to search weather by city name and unit
const searchWeather = async (cityName, unit = tempUnit.value) => {
  try {
    currentWeather.value = await fetchCurrentWeather(cityName, unit);
    weatherForecast.value = await fetchWeatherForecast(cityName, unit);
  } catch (err) {
    error.value = err;
    console.error("Error in App.vue:", err);
  }
};

// Functions for handling city addition and selection
const handleAddCity = (newCity) => {
  if (!cities.value.includes(newCity)) {
    cities.value.push(newCity);
    fetchCurrentWeather(newCity);
  }
};
const handleSelectCity = (city) => {
  searchWeather(city);
};

// Watchers for city change and temperature unit change
watch(city, (newCity) => {
  if (newCity) {
    searchWeather(newCity);
  } else {
    searchWeather('Rotterdam');
  }
});
watch(() => tempUnit.value, (newUnit) => {
  if (city.value) {
    searchWeather(city.value, newUnit);
  }
});

// Function to update temperature unit
const updateTempUnit = (newUnit) => {
  tempUnit.value = newUnit;
  if (currentWeather.value && currentWeather.value.name) {
    searchWeather(currentWeather.value.name);
  }
};
</script>


<template>
  <div class="antialiased bg-[url('public/background.jpg')] min-h-screen">
    <!-- Sidebar Component -->
    <div class="relative">
      <!-- Background Overlay -->
      <div class="absolute inset-0 bg-black opacity-25 z-0 min-h-screen"></div>
      <div class="relative">
        <Sidebar :tempUnit="tempUnit" @update:tempUnit="updateTempUnit" :cities="cities" :isOpen="isSidebarOpen"
          @add-city="handleAddCity" @select-city="handleSelectCity" @close-sidebar="isSidebarOpen = false" />
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <!-- header section -->
          <header class="flex items-center justify-center gap-5">
            <h1 class="text-4xl sm:text-6xl py-5 sm:py-10 text-center text-gray-200">WeatherWhiz</h1>
            <img class="max-h-8 md:max-h-14 mt-3" src="/logo.png" alt="">
          </header>
          <div class="flex items-center justify-between md:justify-end gap-5">
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
            <div v-if="currentWeather && currentWeather.weather && currentWeather.weather.length > 0" class="rounded-lg py-5 sm:py-6 px-3 sm:px-5 shadow" :class="selectBackgroundColor(currentWeather.weather[0].description)">
              <div class="flex justify-between" v-if="currentWeather">
                <div>
                <h1 class="text-2xl sm:text-3xl pb-5 sm:pb-10">Current Weather in {{ currentWeather.name }}</h1>
                <p class="font-light">Avg Temp: <span class="font-normal">{{ currentWeather.main.temp }} °{{ tempUnit ===
                  'metric' ? 'C' : 'F' }}</span></p>
                <p class="font-light">Condition: <span class="font-normal">{{
                  currentWeather.weather[0].description }}</span></p>
                </div>
                  <img class="max-h-16 md:min-h-48" :src="selectImage(currentWeather.weather[0].description, currentWeather.weather[0].icon)" alt="Weather Image">
              </div>
            </div>

            <!-- grouped forecast -->
            <div class="py-10 sm:py-16" v-if="groupedForecast">
              <h2 class="text-xl sm:text-2xl py-5 sm:py-10 text-gray-200 font-bold">5 Day Forecast</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                <div
                  class="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg shadow-lg p-5"
                  v-for="(day, index) in groupedForecast" :key="index">
                  <div class="grid grid-cols-2 md-gap-5 md-pb-5">
                    <h3 class="text-lg">{{ day.date }}</h3>
                    <img class="max-h-16 justify-self-end" :src="day.imageUrl" alt="Weather Image">
                  </div>
                  <p class="font-light">Avg Temp: <span class="font-normal">{{ day.avgTemp }} °{{ tempUnit === 'metric' ?
                    'C' : 'F' }}</span></p>
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
