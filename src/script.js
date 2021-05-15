import './style.css'
import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
  BoxGeometry,
} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import gsap from 'gsap/gsap-core'

const gui = new dat.GUI({closed: true})

const params = {
  color: '#ffffff',
  spin: () =>
    gsap.to(mesh.rotation, {y: mesh.rotation.y + 2 * Math.PI, duration: 1}),
}

const cursor = {
  x: 0,
  y: 0,
}

window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / sizes.width - 0.5
  cursor.y = -(e.clientY / sizes.width - 0.5)
})

// handle double click full screen
window.addEventListener('dblclick', () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

const canvas = document.querySelector('.webgl')

// scene
const scene = new Scene()

// box
const geometry = new BoxGeometry(1, 1, 1, 32, 32, 32)

const material = new MeshBasicMaterial({color: params.color, wireframe: true})
const mesh = new Mesh(geometry, material)
scene.add(mesh)

// debug ui
gui.width = 200
gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('Horizontal')
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('Vertical')
gui.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('Depth')

gui.add(mesh.scale, 'x').min(0).max(1).step(0.01).name('Scale X')
gui.add(mesh.scale, 'y').min(0).max(1).step(0.01).name('Scale Y')
gui.add(mesh.scale, 'z').min(0).max(1).step(0.01).name('Scale Z')
gui
  .add(mesh.rotation, 'x')
  .min(-2 * Math.PI)
  .max(2 * Math.PI)
  .step(0.01)
  .name('Rotation X')
gui
  .add(mesh.rotation, 'y')
  .min(-2 * Math.PI)
  .max(2 * Math.PI)
  .step(0.01)
  .name('Rotation Y')
gui
  .add(mesh.rotation, 'z')
  .min(-2 * Math.PI)
  .max(2 * Math.PI)
  .step(0.01)
  .name('Rotation Z')

gui.add(mesh.material, 'wireframe').name('Wireframe')
gui.add(mesh, 'visible').name('Visibility')
gui
  .addColor(params, 'color')
  .onChange(() => material.color.set(params.color))
  .name('Cube Color')
gui.add(params, 'spin').name('Spin')

// camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const aspectRatio = sizes.width / sizes.height

const camera = new PerspectiveCamera(75, aspectRatio)
camera.position.set(0, 0, 3)
camera.lookAt(mesh.position)
scene.add(camera)

// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y = 1
// controls.update()

// renderer
const renderer = new WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)

const clock = new Clock()

const tick = () => {
  // handle window resizing
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // update controls on each frame to keep damping after release
  controls.update()

  // mesh.rotation.y = clock.getElapsedTime()
  // camera.position.set(
  //   Math.sin(cursor.x * Math.PI * 2) * 3,
  //   cursor.y * 5,
  //   Math.cos(cursor.x * Math.PI * 2) * 3
  // )
  // camera.lookAt(mesh.position)
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()
