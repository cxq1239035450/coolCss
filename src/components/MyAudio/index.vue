<template>
    <audio :src="list[PLAY_INDEX]" controls></audio>
    <div></div>
</template>

<script  setup lang="ts">
import { ref } from 'vue'
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
})

let PLAY_INDEX = ref(0)
</script>

<style scoped lang="scss">
</style>
