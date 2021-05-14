import './style.css'
import {
  Scene,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

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
const mesh = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({color: 'cyan'})
)

scene.add(mesh)

// camera
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const aspectRatio = sizes.width / sizes.height
// const camera = new OrthographicCamera(
//   -aspectRatio,
//   aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// )

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
