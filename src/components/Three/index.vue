<template>
  <div ref="threeBox" class="threeBox"></div>
</template>

<script lang="ts" setup>
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { nextTick, ref } from 'vue'
/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene()
const tween = new TWEEN.Tween({})

/**
 * 创建网格模型
 */
var geometry = new THREE.SphereGeometry(50, 32, 16) //创建一个球体几何对象

var material = new THREE.MeshLambertMaterial({}) //受光照影响

const basicMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff, // 球体的颜色
  opacity: 0.5, // 设置透明度
  transparent: true, // 设置为透明材质
}) //基础材质

//材质对象Material
var mesh = new THREE.Mesh(geometry, basicMaterial) //网格模型对象Mesh
scene.add(mesh) //网格模型添加到场景中
/**
 * 光源设置
 */
//点光源
var point = new THREE.PointLight(0xffffff)
point.position.set(50, 50, 100) //点光源位置
scene.add(point) //点光源添加到场景中
//环境光
var ambient = new THREE.AmbientLight(0x444444)
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
  var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
  camera.position.set(200, 300, 200) //设置相机位置
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
