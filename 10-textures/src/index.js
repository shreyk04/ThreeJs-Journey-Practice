import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'


const scene=new THREE.Scene()
const canvas=document.querySelector('canvas.webgl')




//texture

const textureLoader=new THREE.TextureLoader()
const normalTexture=textureLoader.load('/textures/door/texture2.jpg')


const material=new THREE.MeshBasicMaterial({map:normalTexture})
const geometry=new THREE.BoxGeometry(1,1,1)
const mesh=new THREE.Mesh(geometry,material)
scene.add(mesh)




const sizes={
   width:window.innerWidth,
   height:window.innerHeight
}
const camera=new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
camera.position.z=3


const renderer=new THREE.WebGLRenderer({canvas:canvas})
renderer.setSize(sizes.width,sizes.height)
const controls=new OrbitControls(camera,canvas)

function animate(){
   requestAnimationFrame(animate)
   renderer.render(scene,camera)
   controls.update() 
   mesh.rotation.x+=0.01
   mesh.rotation.y+=0.01
}
animate()