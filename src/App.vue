<script setup>
import { ref } from 'vue';
import { fetchCurrentWeather, fetchWeatherForecast } from './services/WeatherService';

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
</script>


<template>
  <div>
    <input v-model="city" @keyup.enter="searchWeather" placeholder="Enter city name" />
    <div v-if="currentWeather">
      <h1>Current Weather in {{ currentWeather.name }}</h1>
      <p>{{ currentWeather.main.temp }}°C - {{ currentWeather.weather[0].description }}</p>
    </div>
    <div v-if="weatherForecast">
      <h2>5-Day Forecast</h2>
      <ul>
        <li v-for="(item, index) in weatherForecast.list" :key="index">
          {{ new Date(item.dt * 1000).toLocaleTimeString() }}: 
          {{ item.main.temp }}°C, {{ item.weather[0].description }}
        </li>
      </ul>
    </div>
    <p v-if="error">{{ error.message }}</p>
  </div>
</template>

<style scoped>

</style>
