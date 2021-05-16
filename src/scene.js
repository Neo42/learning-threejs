import {Scene} from 'three'
import camera from './camera'
import mesh from './mesh'
// scene
const scene = new Scene()
scene.add(mesh)
scene.add(camera)
export default scene
