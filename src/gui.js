import * as dat from 'dat.gui'
import mesh from './mesh'
import params from './params'

const gui = new dat.GUI()
// debug ui
gui.width = 200
gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('Horizontal')
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('Vertical')
gui.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('Depth')

gui.add(mesh.scale, 'x').min(0).max(1).step(0.01).name('Scale X')
gui.add(mesh.scale, 'y').min(0).max(1).step(0.01).name('Scale Y')
gui.add(mesh.scale, 'z').min(0).max(1).step(0.01).name('Scale Z')
gui
  .add(mesh.rotation, 'x')
  .min(-2 * Math.PI)
  .max(2 * Math.PI)
  .step(0.01)
  .name('Rotation X')
gui
  .add(mesh.rotation, 'y')
  .min(-2 * Math.PI)
  .max(2 * Math.PI)
  .step(0.01)
  .name('Rotation Y')
gui
  .add(mesh.rotation, 'z')
  .min(-2 * Math.PI)
  .max(2 * Math.PI)
  .step(0.01)
  .name('Rotation Z')

gui.add(mesh.material, 'wireframe').name('Wireframe')
gui.add(mesh, 'visible').name('Visibility')
gui
  .addColor(params, 'color')
  .onChange(() => mesh.material.color.set(params.color))
  .name('Cube Color')
