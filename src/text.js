import {FontLoader, Mesh, MeshMatcapMaterial, TextBufferGeometry} from 'three'
import scene, {material} from './scene'
import {matcapTexture} from './textures'

const fontLoader = new FontLoader()
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextBufferGeometry('Creative Developer', {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  })
  const text = new Mesh(textGeometry, material)
  scene.add(text)
  textGeometry.computeBoundingBox()
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) / 2,
  //   -(textGeometry.boundingBox.max.y - 0.02) / 2,
  //   -(textGeometry.boundingBox.max.z - 0.03) / 2,
  // )
  textGeometry.center()
})
