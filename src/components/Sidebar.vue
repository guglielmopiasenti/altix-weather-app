<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  cities: Array
});

const emit = defineEmits(['add-city', 'select-city']);

const newCity = ref('');

const addCity = () => {
  if (newCity.value.trim()) {
    emit('add-city', newCity.value);
    newCity.value = '';
  }
};

const selectCity = (city) => {
  emit('select-city', city);
};
</script>

<template>
  <div class="fixed top-0 left-0 h-full min-w-94 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm transform -translate-x-full transition-transform duration-300 z-10" :class="{ 'translate-x-0': isOpen }">
    <div class="flex items-center p-4 border-b">
      <img src="/logo.png" alt="WeatherWhiz Logo" class="h-8 mr-2">
      <h2 class="text-xl font-semibold">WeatherWhiz</h2>
    </div>
    <div class="p-4">
      <input v-model="newCity" @keyup.enter="addCity" class="block w-full rounded-full border-0 mt-5 mb-14 py-1.5 pl-7 pr-20 text-gray-700 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-200 sm:text-sm sm:leading-6 shadow" placeholder="Add a city" />
      <h3 class="text-xl font-semibold mb-2">Your Cities</h3>
      <ul v-if="props.cities.length">
        <li v-for="city in props.cities" :key="city" @click="selectCity(city)" class="p-2 cursor-pointer rounded-lg border border-transparent hover:border hover:border-gray-200">
          {{ city }}
        </li>
      </ul>
      <p v-else>You still didn't add a city, click on the button to add one</p>
    </div>
  </div>
</template>
