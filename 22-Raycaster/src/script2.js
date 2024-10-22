import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const directionalLight = new THREE.DirectionalLight(0xffffff,1.2);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff,2);
scene.add(ambientLight);

const gltfLoader = new GLTFLoader();

gltfLoader.load("./models/Duck/glTF/Duck.gltf",(gltf=>{
    // scene.add(r.scene)
    scene.add(gltf.scene.children[0])
    console.log(scene);

    
}))





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

renderer.setClearColor(0x808080);


/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect=null

const tick = () =>
{


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    const elapsedTime = clock.getElapsedTime();
    camera.position.set(4*Math.sin(elapsedTime*0.5),3,4*Math.cos(elapsedTime*0.5));

    camera.lookAt(0,0,0);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}




const construct = ()=>{
    const duck = scene.getObjectByName("LOD3spShape");
    console.log('duck ',duck);
    



    const {geometry, material} = duck;
    console.log(geometry);

    const {count} = geometry.index;

    material.wireframe = true;

    console.log(count);

    const parmas = {
        count :0
    }


    gsap.to(parmas,{
        count,
        onUpdate : ()=>{
            geometry.setDrawRange(0,Math.floor(parmas.count));
        },
        duration: 10,
        onComplete: desctruct
    })
}



const desctruct = ()=>{
    const duck = scene.getObjectByProperty("name");
    console.log(duck);
    

    const {geometry, material} = duck;
    console.log(geometry);

    const {count} = geometry.index;

    material.wireframe = true;

    console.log(count);

    const parmas = {
        count :0
    }


    gsap.to(parmas,{
        count,
        onUpdate : ()=>{
            geometry.setDrawRange(0,count - Math.floor(parmas.count));
        },
        duration: 10,
        onComplete: construct
    })
}


const animateDuck = () =>{
    
desctruct();

}

window.addEventListener("dblclick", animateDuck);

tick()