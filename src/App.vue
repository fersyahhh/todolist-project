<script setup>
import BodyTodo from './components/BodyTodo.vue';
import FooterTodo from './components/FooterTodo.vue';
import HeaderTodo from './components/HeaderTodo.vue';

</script>

<template>
  <main class="bg-light">
    <div class="w-full md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] pb-10 md:pt-10 md:pb-20 mx-auto min-h-screen">
      <div class="container">
        <HeaderTodo />
        <BodyTodo />
        <FooterTodo /> 
      </div>
    </div>
  </main>
</template>