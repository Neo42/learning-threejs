import {
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  SphereGeometry,
  ConeGeometry,
  TorusGeometry,
} from 'three'
import {colorTexture} from './textures'

// box
const geometry = new BoxGeometry(1, 1, 1, 32, 32, 32)
// const geometry = new SphereGeometry(1, 32, 32)
// const geometry = new ConeGeometry(1, 1, 32)
// const geometry = new TorusGeometry(1, 0.35, 32, 100)

const material = new MeshBasicMaterial({
  map: colorTexture,
  wireframe: false,
})
const mesh = new Mesh(geometry, material)
export default mesh
