<script setup>
import { Target, Flame } from "lucide-vue-next";
</script>

<template>
  <div class="mt-6 flex h-auto w-full flex-col gap-6 lg:flex-row">
    <div
      class="group hover:ring-primary/20 flex lg:w-1/2 items-center gap-3 rounded-xl bg-white p-4 shadow-md shadow-black/5 transition-all duration-200 ease-in-out hover:shadow-lg hover:ring hover:shadow-black/20"
    >
      <span class="bg-primary/15 text-primary rounded-full p-3"
        ><Target :size="30"
      /></span>
      <div>
        <h1 class="text-dark text-lg font-medium">Stay Focused</h1>
        <p class="text-sm text-slate-500">
          One task at a time. Progress starts today.
        </p>
      </div>
    </div>

    <div
      class="group hover:ring-primary/20 flex lg:w-1/2 items-center gap-3 rounded-xl bg-white p-4 shadow-md shadow-black/5 transition-all duration-200 ease-in-out hover:shadow-lg hover:ring hover:shadow-black/20"
    >
      <span class="rounded-full bg-green-500/15 p-3 text-green-500"
        ><Flame :size="30"
      /></span>
      <div>
        <h1 class="text-dark text-lg font-medium">Keep the Momentum</h1>
        <p class="text-sm text-slate-500">
          Consistency beats motivation. Keep going.
        </p>
      </div>
    </div>
  </div>
</template>
