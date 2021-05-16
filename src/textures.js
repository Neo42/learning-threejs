import {
  LoadingManager,
  MirroredRepeatWrapping,
  NearestFilter,
  RepeatWrapping,
  TextureLoader,
} from 'three'

// naive way to create texture
// const img = new Image()
// img.onload = () => {
//   texture.needsUpdate = true
// }
// img.src = '/textures/door/color.jpg'
// const texture = new Texture(img)

const loadingManager = new LoadingManager()
loadingManager.onStart = () => console.info('texture image started.')
loadingManager.onLoad = () => console.info('texture image loaded.')
loadingManager.onProgress = () => console.info('texture image processing.')
loadingManager.onError = () => console.info('texture image error.')

const textLoader = new TextureLoader(loadingManager)
export const colorTexture = textLoader.load('/textures/minecraft.png')
const alphaTexture = textLoader.load('/textures/door/alpha.jpg')
const heightTexture = textLoader.load('/textures/door/height.jpg')
const normalrTexture = textLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textLoader.load(
  '/textures/door/ambientOcclusion.jpg',
)
const metalnessTexture = textLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textLoader.load('/textures/door/roughness.jpg')

// colorTexture.repeat.setX(2).setY(3)
// colorTexture.wrapS = MirroredRepeatWrapping
// colorTexture.wrapT = MirroredRepeatWrapping

// colorTexture.offset.setX(0.5).setY(0.5)

// colorTexture.rotation = Math.PI / 4
// colorTexture.center.set(0.5, 0.5)

colorTexture.generateMipmaps = false
colorTexture.minFilter = NearestFilter
colorTexture.magFilter = NearestFilter
