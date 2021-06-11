import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load(`/textures/particles/4.png`)

/**
 * Particles
 */
// Geometry
const particleGeometry = new THREE.BufferGeometry()
const count = 200000

const arr = new Float32Array(count * 3)
const positions = arr.map(() => (Math.random() - 0.5) * 10)
const colors = arr.map(() => Math.random())

particleGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3),
)
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

// Material
const particleMaterial = new THREE.PointsMaterial()
particleMaterial.size = 0.1
particleMaterial.sizeAttenuation = true
particleMaterial.transparent = true
particleMaterial.alphaMap = particleTexture
// particleMaterial.alphaTest = 0.001
// particleMaterial.depthTest = false
particleMaterial.depthWrite = false
particleMaterial.blending = THREE.AdditiveBlending
particleMaterial.vertexColors = true

// Points
const particles = new THREE.Points(particleGeometry, particleMaterial)
scene.add(particles)

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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update particles
  // particles.rotation.y = elapsedTime * 0.01
  arr.forEach((_, i) => {
    if (i % 3 === 0) {
      const positionX = particleGeometry.attributes.position.array[i]
      particleGeometry.attributes.position.array[i + 1] = Math.sin(
        elapsedTime + positionX,
      )
    }
  })
  particleGeometry.attributes.position.needsUpdate = true

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
