import {WebGLRenderer} from 'three'
import canvas from './canvas'
import {sizes} from './params'

// renderer
const renderer = new WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)

export default renderer
