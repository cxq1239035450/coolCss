<template>
  <div class="page" >
    <canvas ref="canvasDom" id="canvas" style="width: 100%; height: 80%"></canvas>
    <div class="audioBox">
      <span v-if="!audioObj.is_play" class="iconfont icon-bofang" @click="playBtn"></span>
      <span v-else class="iconfont icon-zanting" @click="pauseBtn"></span>
      <span class="iconfont icon-shangyiji" @click="preBtn"></span>
      <span class="iconfont icon-xiayiji"></span>
      <span class="iconfont icon-yinliang"></span>
      <span class="iconfont icon-jingyin" ></span>
    </div>
  </div>
</template>

<script  setup lang="ts">
import { getFileURL } from '@/general/fileDispose'
import { createDisposableWorker } from '@/general/woker'
import { ref, reactive, computed, toRef,watchEffect } from 'vue'
import { musicObj, musicType } from '@/general/music'
const props = withDefaults(
  defineProps<{
    // 存放音乐列表
    list: string[]
  }>(),
  {
    list: () => ['audio/music1.mp3'],
  }
)
const canvasDom  = ref<HTMLCanvasElement>(null!)

const audioObj = ref<musicType>(null!);
watchEffect(() => {
  audioObj.value = new musicObj(
    getFileURL(props.list[0]),
    canvasDom.value || document.createElement('canvas')
  );
});

const playBtn = ():void => {
  audioObj.value.play()
}
const pauseBtn = ():void  => {
  audioObj.value.pause()
}
const preBtn = ():void  => {
  const a = createDisposableWorker(getFileURL('woker/down.ts'))
  a.post('aaa').then(res=>{

  })
}

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
    box-shadow: 0px 2px 6px 0px rgba(136, 136, 136, 45);
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
