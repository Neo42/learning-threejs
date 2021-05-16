import {BoxGeometry, MeshBasicMaterial, Mesh} from 'three'
import params from './params'

// box
const geometry = new BoxGeometry(1, 1, 1, 32, 32, 32)

const material = new MeshBasicMaterial({color: params.color, wireframe: true})
const mesh = new Mesh(geometry, material)
export default mesh
