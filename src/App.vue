<template>
  <div class="app">
    <Light />
    <MyAudio />
    <Three />
  </div>
</template>

<script setup lang="ts">
import Light from '@/components/Light/index.vue'
import MyAudio from '@/components/MyAudio/index.vue'
import Three from '@/components/Three/index.vue'
</script>

<style lang="scss">
.app {
  height: 100%;
  width: 100%;
  background: var(--primary-background-color);
}
.cursor {
  cursor: pointer;
}
</style>
