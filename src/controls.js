import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import camera from './camera'
import canvas from './canvas'
import params from './params'

const {sizes} = params

const cursor = {
  x: 0,
  y: 0,
}

window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / sizes.width - 0.5
  cursor.y = -(e.clientY / sizes.width - 0.5)
})

// handle double click full screen
window.addEventListener('dblclick', () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

// controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.target.y = 1
// controls.update()

export default controls
