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
  width: 600,
  height: 600,
}
const camera = new PerspectiveCamera(55, sizes.width / sizes.height)
camera.position.set(0, 0, 10)
scene.add(camera)

// renderer
const renderer = new WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)

const clock = new Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  mesh.position.x = Math.cos(elapsedTime)
  mesh.position.y = Math.sin(elapsedTime)
  mesh.position.z = Math.tan(elapsedTime + Math.PI / 2) + 5
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()
