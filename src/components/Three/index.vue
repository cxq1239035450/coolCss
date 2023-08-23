<template>
  <div ref="threeBox" class="threeBox"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
//补间动画库
import * as TWEEN from '@tweenjs/tween.js'
// three 补充库
import * as kokomi from "kokomi.js";
import { nextTick, ref } from 'vue'
/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene()
const tween = new TWEEN.Tween({})

//坐标轴设置
const axesHelper = new THREE.AxesHelper(30)
scene.add(axesHelper)

/**
 * 创建网格模型
 */
var geometry = new THREE.SphereGeometry(50, 32, 16) //创建一个球体几何对象

const material = new THREE.MeshStandardMaterial({
  color: 0xffffff, // 球体的颜色
  opacity: 0.1, // 设置透明度
  transparent: true, // 设置为透明材质
}) //受光照影响


//材质对象Material
var mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
scene.add(mesh) //网格模型添加到场景中


/**
 * 光源设置
 */
//点光源
const point = new THREE.SpotLight(0xffffff,1)
point.position.set(50, 50, 100) //点光源位置
//平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

directionalLight.position.set(100,100,100);
//环境光
const ambient = new THREE.AmbientLight(0xffffff,1)

scene.add(point)
scene.add(directionalLight)
scene.add(ambient)

/**
 * 相机设置
 */

const threeBox = ref<HTMLElement | null>(null)
nextTick(() => {
  var width = threeBox.value?.offsetWidth! //窗口宽度
  var height = threeBox.value?.offsetHeight! //窗口高度

  var k = width / height //窗口宽高比
  var s = 200 //三维场景显示范围控制系数，系数越大，显示的范围越大
  //创建相机对象
  // var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
  let cameraX = 200
  let cameraY = 300
  let cameraZ = 200
  camera.position.set(cameraX, cameraY, cameraZ) //设置相机位置
  camera.lookAt(scene.position) //设置相机方向(指向的场景对象)
  /**
   * 创建渲染器对象
   */
  var renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height) //设置渲染区域尺寸
  renderer.setClearColor(0x76d7ea, 1) //设置背景颜色
  threeBox.value?.appendChild(renderer.domElement)
  //执行渲染操作   指定场景、相机作为参数
  function animate() {
    camera.position.set(cameraX, cameraY, cameraZ)
    requestAnimationFrame(animate)
    TWEEN.update()
    renderer.render(scene, camera)
  }
  animate()
})
</script>

<style lang="scss" scoped>
.threeBox {
  width: 500px;
  height: 500px;
}
</style>
