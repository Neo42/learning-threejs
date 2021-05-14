import './style.css'
import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
  AxesHelper,
  Geometry,
  Vector3,
  Face3,
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

const geometry = new Geometry()

// const vertex1 = new Vector3(0, 0, 0)
// const vertex2 = new Vector3(1, 0, 0)
// const vertex3 = new Vector3(0, 1, 0)
// geometry.vertices.push(vertex1, vertex2, vertex3)

// const face = new Face3(0, 1, 2)
// geometry.faces.push(face)

for (let i = 0; i < 1000; i++) {
  for (let j = 0; j < 4; j++) {
    geometry.vertices.push(
      new Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      )
    )
  }
  const verticesIndex = i * 4
  geometry.faces.push(
    new Face3(
      verticesIndex,
      verticesIndex + 2,
      verticesIndex + 3,
      verticesIndex + 4
    )
  )
}

// box
const mesh = new Mesh(
  geometry,
  new MeshBasicMaterial({color: 'red', wireframe: true})
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
