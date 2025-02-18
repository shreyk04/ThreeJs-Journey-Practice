import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

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
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0180' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff1100' })
)
object2.position.y=-8

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff00ff' })
)
object3.position.x = 2
object3.position.y=8

scene.add(object1, object2, object3)



//RAYCASTER

const raycaster=new THREE.Raycaster()

const rayOrigin=new THREE.Vector3(-3,0,0)
const rayDirection=new THREE.Vector3(10,0,0)
rayDirection.normalize()

raycaster.set(rayOrigin,rayDirection)

const intersect=raycaster.intersectObject(object1)
console.log(intersect);

const intersects=raycaster.intersectObjects([object1,object2,object3])
// const intersects=raycaster.intersectObjects(scene.children)
console.log(intersects);





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



//Mouse

const mouse=new THREE.Vector2()

window.addEventListener('mousemove',(event)=>{
    mouse.x=(event.clientX/sizes.width*2-1)
    mouse.y=-(event.clientY/sizes.height)*2+1
    // console.log(mouse.y);
    
})


window.addEventListener('click',()=>{
    // console.log('click anywhere');

    console.log(currentIntersect);
    
    if(currentIntersect){
        if(currentIntersect.object===object1){
            console.log('click on object1');
            
        }else if(currentIntersect.object===object2){
            console.log('click on object2');
            
        }else if(currentIntersect.object===object3){
            console.log('click on object3');
            
        }
    }
    
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

let currentIntersect=null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()


    object1.position.y=Math.sin(elapsedTime*0.3)*2
    object2.position.y=Math.sin(elapsedTime*0.7)*1.3
    object3.position.y=Math.sin(elapsedTime*0.5)*3


//cast a ray
raycaster.setFromCamera(mouse,camera)



    // const rayOrigin=new THREE.Vector3(-3,0,0)
    // const rayDirection=new THREE.Vector3(1,0,0)
    // rayDirection.normalize()

    // raycaster.set(rayOrigin,rayDirection)

    const objectsToTest=[object1,object2,object3]
    const intersects=raycaster.intersectObjects(objectsToTest)


    // console.log(intersects.length);

    for(const object of objectsToTest){
        object.material.color.set('#ff00ff')
    }

    for(const intersect of intersects){
        // console.log(intersect.object);
        intersect.object.material.color.set('#0000ff')
        
    }
    

    if(intersects.length){
        if(currentIntersect===null){
            console.log('mouse enter');

            
        }
        currentIntersect=intersects[0]
    }else{
        
        if(currentIntersect){
            console.log('mouse leave');
            
        }
        currentIntersect=null
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()