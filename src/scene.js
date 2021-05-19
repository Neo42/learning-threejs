import {Mesh, MeshMatcapMaterial, Scene, TorusBufferGeometry} from 'three'
import camera from './camera'
import mesh from './mesh'
import {matcapTexture} from './textures'
// scene
const scene = new Scene()
// scene.add(mesh)
scene.add(camera)

const donutGeometry = new TorusBufferGeometry(0.3, 0.2, 20, 45)
export const material = new MeshMatcapMaterial({matcap: matcapTexture})

console.time('donuts')

for (let i = 0; i < 1000; i++) {
  const donut = new Mesh(donutGeometry, material)
  donut.position.set(
    (Math.random() - 0.5) * 25,
    (Math.random() - 0.5) * 25,
    (Math.random() - 0.5) * 25,
  )
  donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, null)

  const scale = Math.random()
  donut.scale.set(scale, scale, scale)
  scene.add(donut)
}

console.timeEnd('donuts')

export default scene
