<script setup>
import BodyTodo from './components/BodyTodo.vue';
import FooterTodo from './components/FooterTodo.vue';
import HeaderTodo from './components/HeaderTodo.vue';

</script>

<template>
  <main class="bg-light w-full min-h-screen">
    <div class="container">
      <HeaderTodo />
      <BodyTodo />
      <FooterTodo /> 
    </div>
  </main>
</template>