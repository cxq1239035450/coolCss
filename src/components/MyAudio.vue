<template>
  <audio :src="list[PLAY_INDEX]" controls></audio>
</template>

<script  setup lang="ts">
defineProps({
  // 存放音乐列表
  list: {
    type: Array,
    default: () => [],
  },
  // 是否播放
  IS_PLAY: {
    type: Boolean,
    default: false,
  },
});

let PLAY_INDEX = 0;
</script>

<style scoped lang="scss">
</style>
