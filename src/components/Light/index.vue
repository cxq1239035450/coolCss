<template>
  <div class="fixed">
    <div class="weatherBox"></div>
    <transition name="fade" mode="out-in">
      <span
        class="cursor iconfont icon-taiyang"
        v-if="IS_LIGHT"
        @click="changeSty"
      ></span>
      <span
        class="cursor iconfont icon-yueliang"
        v-else
        @click="changeSty"
      ></span>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity'
import { getGeolocation } from '@/general/weather'
const IS_LIGHT = ref<Boolean>(true)
getGeolocation()
const changeSty = (): void => {
  let stateName = ''
  IS_LIGHT.value ? (stateName = 'dark') : (stateName = 'light')
  IS_LIGHT.value = !IS_LIGHT.value
  window.document.documentElement.setAttribute('data-theme', stateName)
}
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
.weatherBox {
  width: 200px;
  height: 100px;
  background: yellow;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(-80px);
}
.fade-enter-to,
.fade-leave-from {
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
