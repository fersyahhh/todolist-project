<script setup>
import { tasks } from '../stores/storeTodo';
</script>

<template>
  <div class="flex items-center justify-between py-6">
    <div>
      <h1 class="text-primary text-2xl font-bold">Task Master</h1>
      <p class="mt-1 text-sm text-slate-500">
        Organize your workflow efficiently.
      </p>
    </div>

    <div>
      <h3 class="text-xs text-slate-500 uppercase">Progress</h3>
      <h3 class="mt-1">
        {{ tasks.filter(task => task.done).length }} / {{ tasks.length }}
        <span class="text-xs text-slate-500">Tasks</span>
      </h3>
    </div>
  </div>
</template>