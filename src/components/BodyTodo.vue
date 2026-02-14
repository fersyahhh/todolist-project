<script setup>
import { Plus } from "lucide-vue-next";
import { computed, ref, onMounted, onUnmounted } from "vue";
import { tasks } from "../stores/storeTodo";
import emptyImg from "../assets/empty.webp";

// Lucide Icons
import CardTodo from "./CardTodo.vue";

// Window State
const windowWidth = ref(window.innerWidth);

// Reactivity State
const valueInput = ref("");

// Filtered State
const filter = ref("all");

// Filtered Variable
const filteredTasks = computed(() => {
  if (filter.value === "active") {
    return tasks.value.filter((task) => !task.done);
  }

  if (filter.value === "completed") {
    return tasks.value.filter((task) => task.done);
  }

  return tasks.value;
});

function handleResize() {
  windowWidth.value = window.innerWidth;
}

onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const truncateLength = computed(() => {
  if (windowWidth.value < 640) return 20; // mobile
  if (windowWidth.value < 1024) return 35; // md
  return 50; // lg+
});

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

// Function add substring on text task
function truncateTask(text) {
  if (text.length > truncateLength.value) {
    return text.substring(0, truncateLength.value) + "...";
  }
  return text;
}

// Function handle save edit
function saveEdit(id, value) {
  const taskEdit = tasks.value.find((task) => task.id === id);
  if (taskEdit) {
    taskEdit.task = value;
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  }
}

// Function show task left
function showTasksLeft() {
  const showTasks = tasks.value.filter((task) => task.done === false);

  if (showTasks) {
    return showTasks.length;
  }
}

// Function remove done tasks
function removeDoneTasks() {
  const doneTasks = tasks.value.filter((task) => task.done === false);

  if (doneTasks) {
    tasks.value = doneTasks;
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  }
}

// Function handle filter all tasks
function handleAllTasks() {
  filter.value = "all";
}

// Function handle filter active tasks
function handleActiveTasks() {
  filter.value = "active";
}

// Function handle filter completed tasks
function handleCompletedTasks() {
  filter.value = "completed";
}
</script>

<template>
  <div
    class="flex min-h-150 w-full flex-col justify-between overflow-hidden rounded-xl bg-white shadow-md shadow-black/10"
  >
    <div>
      <form
        @submit.prevent="addTask"
        class="flex flex-col gap-4 p-4 md:flex-row"
      >
        <input
          v-model="valueInput"
          class="rounded-lg border border-black/20 p-3 md:w-[70%]"
          type="text"
          placeholder="What needs to be done today?"
        />
        <button
          class="bg-primary transition-all duration-300 ease-in-out hover:opacity-80 flex items-center justify-center gap-3 rounded-lg py-3 font-bold text-white md:mt-0 md:w-[30%]"
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
          v-for="data in filteredTasks"
          :key="data.id"
        >
          <p
            :class="`text-[1.05rem] ${data.done ? 'text-gray-500 line-through' : ''}`"
          >
            {{ truncateTask(data.task) }}
          </p>
        </CardTodo>
      </div>
      <div
        v-if="tasks.length === 0"
        class="flex h-full w-full items-center justify-center py-20"
      >
        <div class="h-40 w-40">
          <img
            class="h-full w-full object-cover object-center"
            :src="emptyImg"
            alt="Empty Image"
          />
        </div>
      </div>
    </div>

    <div
      class="items-center justify-between bg-white/50 px-6 py-6 text-center md:flex"
    >
      <p class="font-medium text-slate-700">{{ showTasksLeft() }} tasks left</p>
      <div
        class="mt-4 mb-6 flex justify-center gap-6 text-slate-600 md:mt-0 md:mb-0"
      >
        <button
          type="button"
          @click="handleAllTasks"
          :class="`transition-all ${filter === 'all' ? 'text-primary' : ''} hover:text-primary hover:bg-primary/10 rounded-md px-2 py-1 duration-300 ease-in-out`"
        >
          All
        </button>
        <button
          type="button"
          @click="handleActiveTasks"
          :class="`hover:text-primary ${filter === 'active' ? 'text-primary' : ''} hover:bg-primary/10 rounded-md px-2 py-1 transition-all duration-300 ease-in-out`"
        >
          Active
        </button>
        <button
          type="button"
          @click="handleCompletedTasks"
          :class="`hover:text-primary ${filter === 'completed' ? 'text-primary' : ''} hover:bg-primary/10 rounded-md px-2 py-1 transition-all duration-300 ease-in-out`"
        >
          Completed
        </button>
      </div>
      <button
        type="button"
        @click="removeDoneTasks"
        class="text-slate-500 transition-all duration-300 ease-in-out hover:text-red-500"
      >
        Clear Completed
      </button>
    </div>
  </div>
</template>
