import * as THREE from 'three'
import { FontLoader, OrbitControls } from 'three/examples/jsm/Addons.js'


//scene
const scene=new THREE.Scene()

const canvas=document.querySelector('canvas.webgl')


//TEXT

const fontLoader=new FontLoader()







const sizes={
    width:window.innerWidth,
    height:window.innerHeight
}




window.addEventListener('resize',()=>{

    //update sizes
    sizes.width=window.innerWidth
    sizes.height=window.innerHeight

    //update camera
    camera.aspect=sizes.width/sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))


})





const geometry=new THREE.BoxGeometry(1,1)
const material=new THREE.MeshBasicMaterial()
const cube=new THREE.Mesh(geometry,material)
// scene.add(cube)
// 

console.log(cube);













//camera

const camera=new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
camera.position.z=3
scene.add(camera)


//renderer

const renderer=new THREE.WebGLRenderer({
    canvas:canvas
})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))



const controls=new OrbitControls(camera,canvas)



const animate=()=>{
    controls.update()

    renderer.render(scene,camera)

    requestAnimationFrame(animate)
}
animate()