import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js'

const scene=new THREE.Scene()

const canvas=document.querySelector('canvas.webgl')




const textureLoader=new THREE.TextureLoader()

const colorTexture=textureLoader.load('/textures/color.jpg')
const normalTexture=textureLoader.load('/textures/normal.jpg')

// to look textures- exactly same as given image 
colorTexture.colorSpace = THREE.SRGBColorSpace



const bakedShadow=textureLoader.load('/textures/bakedShadow.jpg')
const simpleShadow=textureLoader.load('/textures/simpleShadow.jpg')
const panoTexture = textureLoader.load('/textures/pano.jpg')
const gui=new GUI()



const material=new THREE.MeshStandardMaterial()
// material.map = panoTexture;
material.roughness=0.7
// material.side = THREE.DoubleSide;
// material.wireframe = true;
gui.add(material,'metalness').min(0).max(1).step(0.001)
gui.add(material,'roughness').min(0).max(1).step(0.001)


const geometry=new THREE.BoxGeometry(0.5,0.5,0.5)
const mesh= new THREE.Mesh(geometry,material)
// scene.add(mesh)
mesh.position.y=0.3

mesh.castShadow=true

const sphereGeometry=new THREE.SphereGeometry(0.4,15,30)
const sphere=new THREE.Mesh(sphereGeometry,material)
scene.add(sphere)
// sphere.position.set(1,0.3,0)


sphere.castShadow=true

// mesh.position.z=10
const planeMaterial=new THREE.MeshStandardMaterial({color:0xffffff,side:THREE.DoubleSide})
const planeGeometry=new THREE.PlaneGeometry(5,5)
const plane=new THREE.Mesh(planeGeometry,planeMaterial)
plane.rotation.x=-Math.PI*0.5
plane.position.y=-0.5
scene.add(plane)

plane.receiveShadow=true





const sphereShadow=new THREE.Mesh(
    new THREE.PlaneGeometry(1.5,1.5),
    new THREE.MeshBasicMaterial({
        color:0x000000,
        transparent:true,
        alphaMap:simpleShadow
        
    })
)
sphereShadow.rotation.x=-Math.PI*0.5
sphereShadow.position.y=plane.position.y+0.01
scene.add(sphereShadow)



const ambientLight=new THREE.AmbientLight(0xffffff,0.4)
// gui.add(ambientLight,'intensity').max(1).min(0).step(0.01)

gui.add(ambientLight,'intensity').max(1).min(0).step(0.01)
scene.add(ambientLight)

const directionalLight=new THREE.DirectionalLight(0xffffff,0.4)
gui.add(directionalLight,'intensity').max(1).min(0).step(0.01)

scene.add(directionalLight)


// gui.add(directionalLight.position,'x').min(-5).max(5).step(0.001)
// gui.add(directionalLight.position,'y').min(-5).max(5).step(0.001)
// gui.add(directionalLight.position,'z').min(-5).max(5).step(0.001)


// directionalLight.castShadow=true


directionalLight.shadow.mapSize.width=1024/4
directionalLight.shadow.mapSize.height=1024/4
directionalLight.shadow.camera.top=2
directionalLight.shadow.camera.right=2
directionalLight.shadow.camera.left=-2
directionalLight.shadow.camera.bottom=-2
// directionalLight.shadow.camera.near=1
// directionalLight.shadow.camera.far=6
// directionalLight.shadow.radius=10


const pointLight=new THREE.PointLight(0xffffff)
pointLight.position.set(-1,1,0)
// pointLight.castShadow=true
scene.add(pointLight)




//*******SPOT LIGHT********
const spotLight=new THREE.SpotLight(0xffffff,4,10,Math.PI*0.3)
// spotLight.castShadow=true
spotLight.shadow.mapSize.width=1024
spotLight.shadow.mapSize.height=1024

spotLight.position.set(1,1.5,2)
scene.add(spotLight)

scene.add(new THREE.AxesHelper());


const sizes={
   width: window.innerWidth,
   height:window.innerHeight
}




const camera=new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
camera.position.z = 3;
scene.add(camera)



const controls=new OrbitControls(camera,canvas)

controls.enableDamping = true;

const renderer=new THREE.WebGLRenderer({
    canvas:canvas

})
renderer.shadowMap.enabled=true
renderer.shadowMap.type=THREE.PCFShadowMap

renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

console.log(sphere);

const clock=new THREE.Clock()

const animate=()=>{

    // mesh.rotation.x+=Math.PI*0.01
    // mesh.rotation.y+=Math.PI*0.01
   
    // sphere.rotation.x+=Math.PI*0.01
    // sphere.rotation.y+=Math.PI*0.01

    
const elapsedTime=clock.getElapsedTime()
// console.log(elapsedTime);
    
//update the sphere
    // sphere.position.x=Math.sin(elapsedTime)*1.5
    // sphere.position.z=Math.sin(elapsedTime)*1.5
    // sphere.position.z=Math.cos(elapsedTime);
    // sphere.position.y= Math.abs(Math.sin(elapsedTime));
   
   //update the shadow 
    sphereShadow.position.x=sphere.position.x
    sphereShadow.position.z= sphere.position.z
    sphereShadow.material.opacity=(1-sphere.position.y)*0.5


    controls.update()
    renderer.render(scene,camera)

    window.requestAnimationFrame(animate)
}

animate()