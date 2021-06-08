import './style.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {
  AmbientLight,
  BufferAttribute,
  Clock,
  CubeTextureLoader,
  DoubleSide,
  FlatShading,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshLambertMaterial,
  MeshMatcapMaterial,
  MeshNormalMaterial,
  MeshPhongMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  NearestFilter,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  SphereGeometry,
  TextureLoader,
  TorusGeometry,
  WebGLRenderer,
} from 'three'
import * as dat from 'dat.gui'

/**
 * Debug
 */
const gui = new dat.GUI()

/**
 * Textures
 */
const textureLoader = new TextureLoader()
const cubeTextureLoader = new CubeTextureLoader()

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcculutionTexture = textureLoader.load(
  '/textures/door/ambientOcclusion.jpg',
)
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matCapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
const environmentMapTexture = cubeTextureLoader.load([
  '/textures/environmentMaps/0/px.jpg',
  '/textures/environmentMaps/0/nx.jpg',
  '/textures/environmentMaps/0/py.jpg',
  '/textures/environmentMaps/0/ny.jpg',
  '/textures/environmentMaps/0/pz.jpg',
  '/textures/environmentMaps/0/nz.jpg',
])

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new Scene()

// Material
// const material = new MeshBasicMaterial({
//   color: 'red',
//   side: DoubleSide,
//   map: doorColorTexture,
//   opacity: 0.5,
//   transparent: true,
//   alphaMap: doorAlphaTexture,
// })

// const material = new MeshNormalMaterial({flatShading: true})

// const material = new MeshMatcapMaterial({matcap: matCapTexture})

// const material = new MeshLambertMaterial({side: DoubleSide})

// const material = new MeshPhongMaterial({
//   side: DoubleSide,
//   shininess: 1000,
//   specular: 0xff0000, // reflection
// })

// const material = new MeshToonMaterial({
//   side: DoubleSide,
//   gradientMap: gradientTexture,
// })

// gradientTexture.minFilter = NearestFilter
// gradientTexture.magFilter = NearestFilter

// const material = new MeshStandardMaterial()
// material.metalness = 0
// material.roughness = 1
// material.map = doorColorTexture
// material.side = DoubleSide
// material.aoMap = doorAmbientOcculutionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorAlphaTexture
// material.displacementScale = 0.05
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

const material = new MeshStandardMaterial()
material.side = DoubleSide
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture

gui.add(material, 'wireframe')
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(10).step(0.0001)

/**
 * Objects
 */
const sphere = new Mesh(new SphereGeometry(0.5, 64, 64), material)
const plane = new Mesh(new PlaneGeometry(1, 1, 100, 100), material)
const torus = new Mesh(new TorusGeometry(0.3, 0.2, 64, 128), material)

sphere.geometry.setAttribute(
  'uv2',
  new BufferAttribute(sphere.geometry.attributes.uv.array, 2),
)
plane.geometry.setAttribute(
  'uv2',
  new BufferAttribute(plane.geometry.attributes.uv.array, 2),
)
torus.geometry.setAttribute(
  'uv2',
  new BufferAttribute(torus.geometry.attributes.uv.array, 2),
)

sphere.position.x = -1.5
torus.position.x = 1.5

scene.add(sphere, plane, torus)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Light
 */
const ambientLight = new AmbientLight(0xffffff, 0.5)
const pointLight = new PointLight(0xffffff, 0.5)

pointLight.position.set(2, 3, 4)

scene.add(ambientLight, pointLight)

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  plane.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
