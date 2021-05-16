import {PerspectiveCamera} from 'three'
import mesh from './mesh'
import params from './params'

// camera
const {sizes} = params
const aspectRatio = sizes.width / sizes.height

const camera = new PerspectiveCamera(75, aspectRatio)
camera.position.set(0, 0, 3)
camera.lookAt(mesh.position)

export default camera
