import './style.css'
import {
  Scene,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  PerspectiveCamera,
  AxesHelper,
  WebGLRenderer,
} from 'three'

const canvas = document.querySelector('.webgl')

// scene
const scene = new Scene()
const helper = new AxesHelper()
scene.add(helper)

// box
const mesh = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({color: 0xff0000})
)

scene.add(mesh)

// camera
const sizes = {
  width: 500,
  height: 400,
}
const camera = new PerspectiveCamera(55, sizes.width / sizes.height)
scene.add(camera)
camera.position.z = 10

// renderer
const renderer = new WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
