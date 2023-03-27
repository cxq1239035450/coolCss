<template>
  <div class="page">
    <canvas id="canvas" style="width: 100%; height: 80%"></canvas>
    <div class="audioBox">
      <span v-if="!is_play" class="iconfont icon-bofang" @click="play()"></span>
      <span v-else class="iconfont icon-zanting" @click="pause()"></span>
      <span class="iconfont icon-shangyiji"></span>
      <span class="iconfont icon-xiayiji"></span>
      <span class="iconfont icon-yinliang"></span>
      <span class="iconfont icon-jingyin"></span>
    </div>
  </div>
</template>

<script  setup lang="ts">
import { getFileURL } from '@/general/fileDispose'
import { ref, reactive, computed } from 'vue'
import { musicObj } from '@/general/music'
const props = withDefaults(
  defineProps<{
    // 存放音乐列表
    list: string[]
  }>(),
  {
    list: () => ['audio/music1.mp3'],
  }
)
const audioObj = reactive(new musicObj(getFileURL(props.list[0])))
const play = () => {
  audioObj.play()
}
const pause = () => {
  audioObj.pause()
}
const is_play = computed((): Boolean => {
  return audioObj.is_play || false
})
</script>

<style scoped lang="scss">
.page {
  box-sizing: border-box;
  width: 300px;
  height: 400px;
  border: 1px solid var(--primary-border-color);
  color: var(--primary-color);
  padding: 20px;
  .audioBox {
    border: 1px solid var(--primary-border-color);
    border-radius: 20px;
  }
}
</style>
