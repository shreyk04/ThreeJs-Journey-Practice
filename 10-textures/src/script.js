import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import imageSource from './color.jpg'

console.log(imageSource);

const image=new Image()

//Textures


// const texture=new THREE.Texture(image)
// image.onload=()=>{
//     // console.log(texture);
    
//     texture.needsUpdate=true
// }
// image.src='./textures/door/color.jpg'

const loadingManager=new THREE.LoadingManager()

loadingManager.onStart=()=>{
    console.log("onStart");
    
}
loadingManager.onLoad=()=>{
    console.log("onLoaded");
    
}
loadingManager.onProgress=()=>{
    console.log("onProgress");
    
}
loadingManager.onError=()=>{
    console.log("onError");
    
}


const textureLoader=new THREE.TextureLoader(loadingManager)
// const colorTexture=textureLoader.load('/textures/door/color.jpg')
// const colorTexture=textureLoader.load('/textures/checkerboard-1024x1024.png')
const colorTexture=textureLoader.load('/textures/checkerboard-8x8.png')
const alphaTexture=textureLoader.load('/textures/door/alpha.jpg')
const heightTexture=textureLoader.load('/textures/door/height.jpg')
const normalTexture=textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture=textureLoader.load('/textures/door/ambientOcclusion.jpg')
const roughnessTexture=textureLoader.load('/textures/door/roughness.jpg')

// colorTexture.repeat.x=3
// colorTexture.repeat.y=3

// colorTexture.wrapS=THREE.RepeatWrapping
// colorTexture.wrapT=THREE.RepeatWrapping

//mirrored repeat wrapping
//we can change direction
// colorTexture.wrapS=THREE.MirroredRepeatWrapping
// colorTexture.wrapT=THREE.MirroredRepeatWrapping


//we can offset
// colorTexture.offset.x=0.5
// colorTexture.offset.y=0.5


// colorTexture.rotation=Math.PI*4
// colorTexture.center.x=0.5



//sometimes if a picture is too small after streching that pic it will get blur so we can change magnification filter of the texture using  
//****magFilter*** 


// colorTexture.minFilter=THREE.NearestFilter

colorTexture.magFilter=THREE.NearestFilter

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const geometry = new THREE.SphereGeometry(1, 32, 32 )
// const geometry = new THREE.ConeGeometry(1, 1, 32 )
// const geometry = new THREE.CylinderGeometry(1,1,3, 32 )
// const geometry = new THREE.CircleGeometry(1,40)
const geometry = new THREE.BoxGeometry(1,1,1)
// const geometry = new THREE.TorusGeometry(1,0.5,32,100)
// const geometry = new THREE.TorusGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({ map:colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 1
// camera.position.y = 1
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()