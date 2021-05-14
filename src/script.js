import './style.css'
import {
  Scene,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  PerspectiveCamera,
  AxesHelper,
  WebGLRenderer,
  Group,
} from 'three'

const canvas = document.querySelector('.webgl')

// scene
const scene = new Scene()

// position helper
const helper = new AxesHelper()
scene.add(helper)

const useCube = ({color}) =>
  new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({color}))

// box
// const mesh = new Mesh(
//   new BoxGeometry(1, 1, 1),
//   new MeshBasicMaterial({color: 0x0000ff})
// )
// scene.add(mesh)

// group
const cube1 = useCube({color: 'gold'})
const cube2 = useCube({color: 'cyan'})
const cube3 = useCube({color: 'pink'})
cube1.position.set(-2, 0, 0)
cube2.position.set(0, 0, 0)
cube3.position.set(2, 0, 0)

const group = new Group()
group.add(cube1, cube2, cube3)
scene.add(group)

group.position.set(-1, 2, -2)
group.rotation.set(-Math.PI / 8, -Math.PI / 8, Math.PI / 8)
group.scale.set(2, 2, 3)

// // mesh transform
// mesh.position.set(2, 3, -3)
// mesh.scale.set(3, 6, 2)
// // clock wise relative to positve direction of that axis
// // note: rotation is always based on the axis of the shape its own
// mesh.rotation.set(Math.PI / 8, Math.PI / 8, Math.PI / 8)

// camera
const sizes = {
  width: 600,
  height: 600,
}
const camera = new PerspectiveCamera(55, sizes.width / sizes.height)
camera.position.set(0, 0, 10)
// camera.lookAt(mesh.position) // camera look at a position
scene.add(camera)

// console.log(mesh.position.length()) // distance to origin point
// // mesh.position.normalize() // normalize length of position vector to 1
// console.log(mesh.position.distanceTo(camera.position))

// renderer
const renderer = new WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
