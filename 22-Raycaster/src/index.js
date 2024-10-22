import * as THREE from 'three'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'

const scene=new THREE.Scene()

const canvas=document.querySelector('canvas.webgl')


const sizes={
    width:window.innerWidth,
    height:window.innerHeight
}

const camera=new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
camera.position.set(2, 4, 4)




scene.add(camera)


const ambientLight=new THREE.AmbientLight(0xffffff,1.2)
scene.add(ambientLight)

const directionalLight=new THREE.DirectionalLight(0xffffff,0.5)
scene.add(directionalLight)



// const object1 = new THREE.Mesh(
//     new THREE.BoxGeometry(2,2),
//     new THREE.MeshBasicMaterial({ color: '#ff0180' })
// )
// // object1.position.x =  2
// scene.add(object1)
let mixer=null

const gltfLoader=new GLTFLoader()

gltfLoader.load('./models/Fox/glTF/Fox.gltf', (
    gltf=>{
        console.log(gltf);
        scene.add(gltf.scene)

        gltf.scene.scale.set(0.025,0.025,0.025)
        gltf.scene.position.set(0,0,0)
        

       //animations

        mixer=new THREE.AnimationMixer(gltf.scene)
         console.log(gltf.animations);
    
              
        const action=mixer.clipAction(gltf.animations[2])
        console.log(action);
        action.play()
      
    }
))

console.log(scene);







const renderer=new THREE.WebGLRenderer({
canvas:canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// renderer.setPixelRatio(sizes.width,sizes.height)

window.addEventListener('resize',()=>{

    //update size
    sizes.width=window.innerWidth
    sizes.height=window.innerHeight

    //update camera
    camera.aspect=sizes.width/sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

})

const controls=new OrbitControls(camera,canvas)
controls.enableDamping=true


const clock=new THREE.Clock()
let previousTime=0
const animate=()=>{

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime


    if(mixer!=null)
    {
    mixer.update(deltaTime)
    }

    controls.update()

    renderer.render(scene,camera)

    requestAnimationFrame(animate)
}

animate()