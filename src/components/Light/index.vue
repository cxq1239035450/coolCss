<template>
  <div class="fixed">
    <transition name="fade" mode="out-in">
      <span class="cursor" v-if="IS_LIGHT" @click="c">☀</span>
      <span class="cursor" v-else @click="c">🌙</span>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";

const IS_LIGHT = ref<Boolean>(true);
const c = (): void => {
  let stateName = "";
  IS_LIGHT.value ? (stateName = "dark") : (stateName = "light");
  IS_LIGHT.value = !IS_LIGHT.value;
  window.document.documentElement.setAttribute("data-theme", stateName);
};
</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
  top: 20px;
  right: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--primary-color);
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(-80px);
}
.fade-enter-to,.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(80px);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s;
}
</style>
