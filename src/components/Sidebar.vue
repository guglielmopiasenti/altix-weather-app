<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  cities: Array,
  tempUnit: String
});

const emit = defineEmits(['add-city', 'select-city', 'close-sidebar', 'update:tempUnit']);

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

const closeSidebar = () => {
  emit('close-sidebar');
};

watch(() => props.tempUnit, (newValue) => {
  emit('update:tempUnit', newValue);
});

const toggleTempUnit = () => {
  const newUnit = props.tempUnit === 'metric' ? 'imperial' : 'metric';
  emit('update:tempUnit', newUnit);
};

</script>

<template>
  <div
    class="fixed top-0 left-0 h-full w-screen md:w-[600px] bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm transform -translate-x-full transition-transform duration-300 z-10"
    :class="{ 'translate-x-0': isOpen }">
    <div class="flex p-4 border-b justify-between items-center">
      <div class="flex">
        <img src="/logo.png" alt="WeatherWhiz Logo" class="h-8 mr-2">
        <h2 class="text-xl font-semibold">WeatherWhiz</h2>
      </div>
      <div class="flex gap-10">
        <div class="flex items-center gap-2">
          <span class="font-semibold">°C</span>
          <button :class="{ 'bg-[#889FC6]': props.tempUnit === 'imperial', 'bg-gray-200': props.tempUnit === 'metric' }"
            class="flex items-center p-1 w-12 h-6 rounded-full transition-colors" @click="toggleTempUnit">
            <span
              :class="{ 'translate-x-6': props.tempUnit === 'imperial', 'translate-x-0': props.tempUnit === 'metric' }"
              class="h-4 w-4 transform bg-white rounded-full shadow transition-transform"></span>
          </button>
          <span class="font-semibold">°F</span>
        </div>

        <button @click="closeSidebar" class="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    <div class="p-4">
      <input v-model="newCity" @keyup.enter="addCity"
        class="block w-full rounded-full border-0 mt-5 mb-14 py-1.5 pl-7 pr-20 text-gray-700 outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-200 sm:text-sm sm:leading-6 shadow"
        placeholder="Add a city" />
      <h3 class="text-xl font-semibold mb-2">Your Cities</h3>
      <ul v-if="props.cities.length">
        <li v-for="city in props.cities" :key="city" @click="selectCity(city)"
          class="p-2 cursor-pointer rounded-lg border border-transparent hover:border hover:border-gray-200">
          {{ city }}
        </li>
      </ul>
      <p v-else>You still didn't add a city, click on the button to add one</p>
    </div>
  </div>
</template>
