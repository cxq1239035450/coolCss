<template>
  <div ref="left" v-loading="loading" :style="`width:${width}px;height:${height}px`" class="imgBox showIcon" @wheel="wheel">
    <div
      ref="imgBox"
      class="box"
      :style="`left:${position.x}px;top:${position.y}px;transform: rotate(${rotate}deg);`"
      @mousedown="mousedown"
      @mouseup="mouseup"
    >
      <img
        v-for="(imgUrl,index) in imgUrlList"
        :key="index"
        ref="img"
        :style="`width:${width*ratio/100}px;`"
        :src="imgUrl"
        @load="imgLoad"
        @error="imgLoad"
      />
    </div>
    <div class="refreshBtn icon" @click="refreshBtn">
      <svg-icon icon-class="refresh" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: 100
    },
    height: {
      type: [Number, String],
      default: 100
    },
    imgUrlList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: true,
      loading: false,
      offset: { x: 0, y: 0 },
      position: { x: 0, y: 0 },
      boxSize: { width: 0, height: 0 },
      imgSize: { width: 0, height: 0 },
      ratio: 100,
      rotate: 0,
      loadImg: 0
    }
  },
  mounted() {
    this.loading = true
    document.body.addEventListener('mouseup', this.removeMove)
  },
  beforeDestroy() {
    document.body.removeEventListener('mouseup', this.removeMove)
  },
  methods: {
    close() {
      this.visible = false
    },
    refreshBtn() {
      this.rotate += 90
      const poor = (this.imgSize.height - this.imgSize.width) / 2
      const com = (num, poor) => {
        if (num > 0) {
          return num + poor
        } else {
          return num - poor
        }
      }
      this.position = {
        x: com(this.position.x, poor),
        y: com(this.position.y, poor)
      }
    },
    wheel(event) {
      event.preventDefault()
      if (event.deltaY < 0 && this.ratio < 200) {
        this.ratio = this.ratio + 10
      } else if (event.deltaY > 0 && this.ratio > 10) {
        this.ratio = this.ratio - 10
      }
      this.$nextTick(() => {
        this.getImageInfo()
      })
    },
    imgLoad() {
      this.loadImg++
      if (this.loadImg === this.imgUrlList.length) {
        this.getImageInfo()
        this.loading = false
      }
    },
    getImageInfo() {
      const img = this.$refs.img
      let width = 0
      let height = 0
      for (let i = 0; i < img.length; i++) {
        width += img[i].clientWidth
        height = img[i].clientHeight
      }
      this.imgSize = {
        width, height
      }
    },
    mousedown(e) {
      this.offset = {
        x: e.x - this.position.x,
        y: e.y - this.position.y
      }
      const leftBox = this.$refs.left

      this.boxSize = {
        width: leftBox.clientWidth,
        height: leftBox.clientHeight
      }
      window.addEventListener('mousemove', this.mouseMove)
    },
    removeMove() {
      window.removeEventListener('mousemove', this.mouseMove)
    },
    mouseMove(e) {
      e.preventDefault()
      const MAX = 80
      const poor = this.rotate % 180 > 0 ? (this.imgSize.height - this.imgSize.width) / 2 : 0
      const offsetX = Math.max(Math.min(e.x - this.offset.x, this.width - MAX + poor), MAX - this.imgSize.width - poor)
      const offsetY = Math.max(Math.min(e.y - this.offset.y, this.height - MAX - poor), MAX - this.imgSize.height + poor)
      this.position = {
        x: offsetX,
        y: offsetY
      }
    },
    mouseup() {
      window.removeEventListener('mousemove', this.mouseMove)
    }
  }
}
</script>

<style lang="scss" scoped>
.imgBox{
  // background: skyblue;
  overflow: hidden;
  position: relative;
  user-select: none;
  .box{
    position: absolute;
    white-space: nowrap;
    width: fit-content;
    border: 1px solid rgba(240, 240, 240, 0.5);
    box-shadow: 0px 2px 6px 0px #555;
  }
  .refreshBtn{
    position: absolute;
    right: -1px;
    bottom: -1px;
    width: 25px;
    height: 25px;
    color:#0080FF;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #0080ff;
    border-radius: 4px;
    font-size: 18px;
  }
}
.grab{
  cursor: grab;
}
.grabing {
  cursor: grabbing
}
</style>
