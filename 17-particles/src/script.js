import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { color } from 'three/examples/jsm/nodes/Nodes.js'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { Mesh } from 'three/src/Three.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particlesTexture=textureLoader.load('/textures/particles/2.png')





/**
 * Particles
 */

const particlesGeometry=new THREE.BufferGeometry()
const count=5000;

const positions=new Float32Array(count*3)
const colors=new Float32Array(count*3)

for(let i=0;i<count*3;i++){
    positions[i]=(Math.random()-0.5)*10
    colors[i]=Math.random()
}

particlesGeometry.setAttribute(
'position',
new THREE.BufferAttribute(positions,3)

)
particlesGeometry.setAttribute(
'color',
new THREE.BufferAttribute(colors,3)

)


//Material
const particlesMaterial=new THREE.PointsMaterial({
    size:0.1,
    sizeAttenuation:true
})
// particlesMaterial.color=new THREE.Color('#ff0000')

// particlesMaterial.map=particlesTexture
particlesMaterial.transparent=true
particlesMaterial.alphaMap=particlesTexture
// particlesMaterial.alphaTest=0.001
// particlesMaterial.depthTest=false
particlesMaterial.depthWrite=false
particlesMaterial.vertexColors=true






//points

const particles=new THREE.Points(particlesGeometry,particlesMaterial)

scene.add(particles)



const cube=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial()
)
scene.add(cube)




//3D MODEL

const loader=new GLTFLoader()
loader.load('./models/clockTower.glb',function(gltf){
   
    scene.clear();
    // scene.add(new Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshBasicMaterial({color: 0xff0000})))
    const clockTower = gltf.scene;

    const box = new THREE.BoxHelper();
    box.setFromObject(clockTower);

    
})





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

    // particles.rotation.y=elapsedTime*0.2
    particles.position.y=-elapsedTime*0.2

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()