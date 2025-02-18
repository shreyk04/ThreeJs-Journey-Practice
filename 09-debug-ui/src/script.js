import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'


/**
 * Debug
 */
const gui=new dat.GUI({closed:true,width:400})

//to hide the panel at start
// gui.hide()

//by pressing H we can hide or show control panel



const parameters={
    color:0xff00f2,
    spin:()=>{
        gsap.to(mesh.rotation,{duration:2,y:mesh.rotation.y+10})
    }
}
gui
.addColor(parameters,'color')
.onChange(()=>{
    material.color.set(parameters.color)
})
gui.add(parameters,'spin')


//to add folder in gui
var folder1 = gui.addFolder('Flow Field');

folder1.add(parameters,'color')


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
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)



//Debug

gui
.add(mesh.position,'y')
.min(-3)
.max(3)
.step(0.1)
.name('elevation')

gui.add(mesh,'visible')
gui.add(material,'wireframe')


//Color



// gui.add(mesh.position,'z').min(-3).max(3).step(0.1)
// gui.add(mesh.position,'x').min(-3).max(3).step(0.1)


// gui.add(mesh.position,'z',-3,3,0.01)
// gui.add(mesh.position,'x',-3,3,0.01)




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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()