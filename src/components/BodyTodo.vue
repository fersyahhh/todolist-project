<script setup>
import { Plus } from "lucide-vue-next";
import { ref } from "vue";
import { tasks } from "../stores/storeTodo";

// Lucide Icons
import CardTodo from "./CardTodo.vue";

// Reactivity State
const valueInput = ref("");

// Function handle add task
function addTask() {
  if (valueInput.value.trim() === "") return;

  const newTask = {
    id: crypto.randomUUID(),
    task: valueInput.value,
    done: false,
  };

  tasks.value.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks.value));

  // Clear input when user submit
  valueInput.value = "";
}

// Function handle toggle done task
function toggleDone(id, value) {
  const taskDone = tasks.value.find((task) => task.id === id);

  if (taskDone) {
    taskDone.done = value;
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  }
}

// Function handle remove task
function removeTask(id) {
  tasks.value = tasks.value.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
}

function truncateTask(data, length = 20) {
  if (data.length > length) {
    return data.substring(0, length) + "...";
  } else {
    return data;
  }
}

function saveEdit(id, value) {
  const taskEdit = tasks.value.find((task) => task.id === id);
  if (taskEdit) {
    taskEdit.task = value;
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  }
}
</script>

<template>
  <div class="rounded-xl bg-white">
    <form @submit.prevent="addTask" class="flex flex-col px-4 py-3">
      <input
        v-model="valueInput"
        class="rounded-lg border border-black/20 p-3"
        type="text"
        placeholder="What needs to be done today?"
      />
      <button
        class="bg-primary mt-4 flex items-center justify-center gap-3 rounded-lg py-3 font-bold text-white"
      >
        <span><Plus color="white" :size="20" /></span> Add Task
      </button>
    </form>

    <div v-if="tasks.length !== 0" class="mt-6">
      <CardTodo
        :remove-task="removeTask"
        :save-edit="saveEdit"
        :id-task="data.id"
        :is-checked="data.done"
        :toggle-done="toggleDone"
        v-for="data in tasks"
        :key="data.id"
      >
        <p
          :class="`text-[1.05rem] ${data.done ? 'text-gray-500 line-through' : ''}`"
        >
          {{ truncateTask(data.task) }}
        </p>
      </CardTodo>
    </div>
  </div>
</template>
