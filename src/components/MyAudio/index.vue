<template>
    <audio :src="localUrl" controls></audio>
    <div class="page">
      <canvas style="width:100%;height:80%"></canvas>
      <div class="audioBox">
        <span>&gt;</span>
        <span>&gt;</span>
        <span>&gt;</span>
      </div>
    </div>
</template>

<script  setup lang="ts">
import { getFileURL } from "@/general/fileDispose";
import { ref,computed } from 'vue'
const props = withDefaults(defineProps<{
    // 存放音乐列表
    list:string[],
    // 是否播放
    IS_PLAY:boolean
}>(),
{
    list:()=>['audio/music1.mp3'],
    IS_PLAY:false
}
)
let PLAY_INDEX = ref<number>(0)
const localUrl = computed(():string=>{
    const index:number = PLAY_INDEX.value

    return getFileURL(props.list[index])
})

</script>

<style scoped lang="scss">
.page{
  box-sizing: border-box;
  width: 300px;
  height: 400px;
  border: 1px solid black;
  padding: 20px;
  .audioBox{
    border: 1px solid black;
    border-radius: 20px;
  }
}
</style>
