import { ref, watch } from "vue";

export const tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  },
  { deep: true },
);
