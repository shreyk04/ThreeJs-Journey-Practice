import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/Addons.js'

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
 * Lights
 */


//Ambient Light
const ambientLight=new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambientLight)


gui.add(ambientLight,'intensity').max(1).min(0).step(0.01)


//Directional Light
const directionalLight=new THREE.DirectionalLight(0xff1819,0.9)
directionalLight.position.set(0,2,0.3)
scene.add(directionalLight)

gui.add(directionalLight,'intensity').max(1).min(0).step(0.01)



//Hemisphere light
const hemisphereLight=new THREE.HemisphereLight(0xff0000,0x0000ff,0.9)
scene.add(hemisphereLight)



//Point Light

const pointLight=new THREE.PointLight(0xffffff,1)
pointLight.position.set(1.4,0,1.2)
scene.add(pointLight)


//ReactArea Light
const rectAreaLight=new THREE.RectAreaLight(0x4e00ff,2,3,1)
rectAreaLight.position.set(1.5,1.2,1.2)
scene.add(rectAreaLight)


const rectAreaLightHelper=new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)



//spotlight

// const spotlight=new THREE.SpotLight(color,intensity,distance,angle,pneumbra,decay)
const spotlight=new THREE.SpotLight(0x78ff00,2,7,Math.PI*0.1,0.25,0.6)
spotlight.position.set(1,1,1)
scene.add(spotlight)



//Light Helper

const hemisphereLightHelper=new THREE.HemisphereLightHelper(hemisphereLight,0.4,0xffffff)
scene.add(hemisphereLightHelper)

const pointLightHelper=new THREE.PointLightHelper(pointLight,0.2,0xff00ff)
scene.add(pointLightHelper)

const spotlightHelper=new THREE.SpotLightHelper(spotlight)
scene.add(spotlightHelper)

// const pointLight = new THREE.PointLight(0xffffff, 50)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5,5),
    material
)

plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


