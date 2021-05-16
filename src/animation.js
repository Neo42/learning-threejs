import camera from './camera'
import controls from './controls'
import params from './params'
import renderer from './renderer'
import scene from './scene'

const {sizes} = params

const tick = () => {
  // handle window resizing
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // update controls on each frame to keep damping after release
  controls.update()

  // mesh.rotation.y = clock.getElapsedTime()
  // camera.position.set(
  //   Math.sin(cursor.x * Math.PI * 2) * 3,
  //   cursor.y * 5,
  //   Math.cos(cursor.x * Math.PI * 2) * 3
  // )
  // camera.lookAt(mesh.position)
  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}
tick()
