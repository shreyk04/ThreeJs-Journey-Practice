import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x=0.7
// mesh.position.y=-0.6
// mesh.position.z=1

// instead of changing x, y and z separately, you can also use the set(...) method:
mesh.position.set(0.7,0.3,2)


//Rotation

mesh.rotation.x=Math.PI*0.4
mesh.rotation.y=Math.PI*2.3
mesh.rotation.reorder('YXZ')


scene.add(mesh)

// to get distance between the center of scene and objects position
console.log(mesh.position.length());



//to normalize object length to 1
mesh.position.normalize()
console.log("after normalizing length is " ,mesh.position.length());





/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
   
}

/**
 * Camera
 */
const aspectRatio=sizes.width/sizes.height
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,100)
// const camera=new THREE.OrthographicCamera(-1*aspectRatio,1*aspectRatio,1,-1,0.1,100)
camera.position.z = 3
scene.add(camera)

//to get distance between camera and object
console.log(mesh.position.distanceTo(camera.position));



//Controls
const controls=new OrbitControls(camera,canvas)





/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


//time
let time=Date.now()


//animations
const clock=new THREE.Clock()


const tick=()=>{
    // console.log('tick');

    // const currentTime=Date.now()
    // const deltaTime=currentTime-time
    // time=currentTime


//three.js has a built in solution named  Clock.Instantiate a Clock and use its getElapsedTime() method
const elapsedTime=clock.getElapsedTime()



    //update objects

    // mesh.rotation.x+=deltaTime;
    // mesh.rotation.x+=0.002*deltaTime;
    // mesh.rotation.y+=0.002*deltaTime;

    // mesh.rotation.x=elapsedTime
    // camera.position.y=Math.sin(elapsedTime)
    // camera.position.x=Math.cos(elapsedTime)
    // mesh.position.x+=0.01
    renderer.render(scene, camera)
    

    window.requestAnimationFrame(tick)
}

tick()