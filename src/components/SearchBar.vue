<script setup>
import { ref, defineEmits } from 'vue';

const props = defineProps({
  defaultCity: String,
  cities: Array
});
const city = ref(props.defaultCity || '');
const emit = defineEmits(['search', 'city-added']);

const emitSearch = () => {
  emit('search', city.value);
  emit('city-added', city.value);
};
</script>


<template>
  <div class="flex items-center justify-center md:justify-end my-10">
    <div class="flex rounded-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm px-2 max-w-[400px] shadow-lg hover:ring-2 hover:ring-blue-200 hover:ring-opacity-60">
      <input v-model="city" @keyup.enter="emitSearch" type="text"
        class="w-full flex bg-transparent pl-2 text-gray-200 outline-0" placeholder="Enter city name" />
      <button @click="emitSearch" type="button" class="relative p-2">
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
</template>