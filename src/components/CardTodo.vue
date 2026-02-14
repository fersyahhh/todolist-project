<script setup>
// Lucide Icons
import { Pencil, Trash } from "lucide-vue-next";
import { ref, nextTick } from "vue";

// Props
const props = defineProps({
  isChecked: Boolean,
  toggleDone: Function,
  removeTask: Function,
  saveEdit: Function,
  idTask: Number,
});

// Data Ref
const isEdit = ref(false);
const editInput = ref(null);
const valueEdit = ref("");

// Function handle checkbox
function toggleCheck(e) {
  props.toggleDone(props.idTask, e.target.checked);
}

// Function handle remove task
function handleRemove() {
  props.removeTask(props.idTask);
}

// Function toggle edit
function toggleEdit() {
  isEdit.value = !isEdit.value;

  nextTick(() => {
    editInput.value?.focus();
  });

  valueEdit.value = "";
}

// Function handle edit
function handleEdit() {
  props.saveEdit(props.idTask, valueEdit.value);
  isEdit.value = false;
}
</script>

<template>
  <div class="border-y border-black/5 bg-white px-4 py-6">
    <div :class="`flex justify-between ${isEdit ? 'flex-col' : ''}`">
      <input
        v-model="valueEdit"
        ref="editInput"
        v-if="isEdit"
        class="focus:ring-primary w-full rounded-md border border-black/20 px-3 py-2 transition-all duration-300 ease-in-out outline-none focus:ring"
        type="text"
      />
      <div v-else class="flex items-center gap-4">
        <input
          :checked="props.isChecked"
          @change="toggleCheck"
          class="h-6 w-6 transition-all duration-300 ease-in-out"
          type="checkbox"
        />
        <slot />
      </div>
      <div v-if="!isEdit" class="flex items-center space-x-6 text-slate-500">
        <button
          @click="toggleEdit"
          class="transition-all duration-300 ease-in-out hover:text-red-500"
        >
          <Pencil :size="20" />
        </button>
        <button
          class="transition-all duration-300 ease-in-out hover:text-red-500"
          @click="handleRemove"
        >
          <Trash :size="20" />
        </button>
      </div>
      <div v-else-if="isEdit" class="mt-4 flex items-center gap-3">
        <button
          @click="handleEdit"
          class="bg-primary w-1/2 rounded-lg py-3 font-semibold text-white hover:opacity-80 transition-all duration-300 ease-in-out"
        >
          Save
        </button>
        <button
          @click="toggleEdit"
          class="w-1/2 rounded-lg bg-slate-300 py-3 font-medium text-slate-700 hover:opacity-80 transition-all duration-300 ease-in-out"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
