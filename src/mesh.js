import {
  BoxBufferGeometry,
  MeshBasicMaterial,
  Mesh,
  SphereBufferGeometry,
  ConeBufferGeometry,
  TorusBufferGeometry,
} from 'three'
import {colorTexture} from './textures'

// box
const geometry = new BoxBufferGeometry(1, 1, 1, 32, 32, 32)
// const geometry = new SphereBufferGeometry(1, 32, 32)
// const geometry = new ConeBufferGeometry(1, 1, 32)
// const geometry = new TorusBufferGeometry(1, 0.35, 32, 100)

const material = new MeshBasicMaterial({
  map: colorTexture,
  wireframe: false,
})
const mesh = new Mesh(geometry, material)
export default mesh
