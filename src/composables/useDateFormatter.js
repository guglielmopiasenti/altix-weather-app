import { computed } from "vue";

export function useDateFormatter(timestamp) {
  const formattedDate = computed(() => {
    if (!timestamp.value) return "";

    // This will give you a date string like "Thu Feb 15 2024"
    const date = new Date(timestamp.value * 1000).toDateString();

    return date;
  });

  return { formattedDate };
}
