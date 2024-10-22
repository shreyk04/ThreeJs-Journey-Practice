import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { DRACOLoader, GLTFLoader, Sky } from 'three/examples/jsm/Addons.js'



/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



//Fog
const fog = new THREE.Fog('#7dcae8',10,50);
scene.fog = fog;










//Textures

const textureLoader = new THREE.TextureLoader()

// const floorColorTexture=textureLoader.load('textures/floor/sparse_grass_diff_1k.jpg')
// const floorArmTexture=textureLoader.load('textures/floor/sparse_grass_arm_1k.jpg')
// const floorDisplacementTexture=textureLoader.load('textures/floor/sparse_grass_disp_1k.jpg')
// const floorNormalTexture=textureLoader.load('textures/floor/sparse_grass_nor_gl_1k.jpg')
const floorColorTexture = textureLoader.load('textures/floor/rocky_terrain_02_diff_1k.jpg')
const floorArmTexture = textureLoader.load('textures/floor/rocky_terrain_02_arm_1k.jpg')
const floorDisplacementTexture = textureLoader.load('textures/floor/rocky_terrain_02_disp_1k.jpg')
const floorNormalTexture = textureLoader.load('textures/floor/rocky_terrain_02_nor_gl_1k.jpg')

// const floorColorTexture = textureLoader.load('textures/floor/dirt_diff_1k.jpg')
// const floorArmTexture = textureLoader.load('textures/floor/dirt_arm_1k.jpg')
// const floorDisplacementTexture = textureLoader.load('textures/floor/dirt_disp_1k.jpg')
// const floorNormalTexture = textureLoader.load('textures/floor/dirt_nor_gl_1k.jpg')

floorColorTexture.colorSpace = THREE.SRGBColorSpace


//load model





//load draco  
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')



const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)


let mixers = []

gltfLoader.load('/models/Horse/Horse.glb', (gltf => {
    // gltfLoader.load('/models/Fox/glTF/Fox.gltf',(gltf=>{
    // scene.add(gltf.scene)

    console.log(gltf.scene);
    // const children=[...gltf.scene.children]
    // for(const child of children){
    //     scene.add(child)
    // }

    // gltf.scene.scale.set(0.025,0.025,0.025)

    //Horse1
    const originalHorse = gltf.scene
    originalHorse.scale.set(0.01, 0.01, 0.01)
    originalHorse.position.set(1, 0, 0)
    scene.add(originalHorse)
console.log(originalHorse.material);



    originalHorse.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            const horseMaterial=child.material
            console.log(horseMaterial);
            gui.add(horseMaterial,'wireframe').name('Wireframe')
            
        }
    });


    

    // originalHorse.castShadow = true

    // gltf.scene.scale.set(0.01,0.01,0.01)



    console.log(gltf.animations);

    //**************ANIMATIONS************

    const mixer1 = new THREE.AnimationMixer(originalHorse)
    mixers.push(mixer1)

    
     console.log(gltf.animations);

    const action1 = mixer1.clipAction(gltf.animations[0])
    console.log(action1);
    action1.play()



    //Clone

    // let clonedHorse
    for (let i = -5; i < 5; i++) {
        for(let j=-5;j<5;j++){

        
        const clonedHorse = originalHorse.clone()
        clonedHorse.position.set( i*2, 0, j*4);
        scene.add(clonedHorse)
        clonedHorse.castShadow = true


        const mixerClone = new THREE.AnimationMixer(clonedHorse)
        mixers.push(mixerClone)

        const actionClone = mixerClone.clipAction(gltf.animations[0])
        actionClone.play()
        }
    }

    // console.log(gltf.scene.children.length);

}))
// gltfLoader.load('/models/Duck/glTF-Draco/Duck.gltf',(gltf=>{
//     scene.add(gltf.scene)
//     console.log(gltf.scene);
//     // const children=[...gltf.scene.children]
//     // for(const child of children){
//     //     scene.add(child)
//     // }



//     console.log(gltf.scene.children.length);

// }))



/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(150, 150),
    new THREE.MeshStandardMaterial({
        color: '#919191',
        side: THREE.DoubleSide,
        // metalness: 0,
        // roughness: 0.5,
        map: floorColorTexture,
        aoMap: floorArmTexture,
        roughnessMap: floorArmTexture,
        metalnessMap: floorArmTexture,
        displacementMap: floorDisplacementTexture,
        normalMap: floorNormalTexture
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
floor.position.y = -0.37
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
scene.add(ambientLight)

// Adjust directional light position and ensure castShadow is set properly
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8)
directionalLight.position.set(5, 5, 5) // Positioning the light higher to cast proper shadows
directionalLight.position.y=10

directionalLight.castShadow = true

// Update shadow camera settings for better coverage
directionalLight.shadow.mapSize.set(2048, 2048) // Increase shadow map resolution
directionalLight.shadow.camera.far = 20
directionalLight.shadow.camera.left = -10
directionalLight.shadow.camera.right = 10
directionalLight.shadow.camera.top = 10
directionalLight.shadow.camera.bottom = -10

scene.add(directionalLight)





//SKY

const sky=new Sky()
sky.scale.set(100,100,100)
// scene.add(sky)

sky.material.uniforms['turbidity'].value=10
sky.material.uniforms['rayleigh'].value=3
sky.material.uniforms['mieCoefficient'].value=0.1
sky.material.uniforms['mieDirectionalG'].value=0.95
sky.material.uniforms['sunPosition'].value.set(0.3,-0.038,-0.95)



//**********FOG

//fog is useful if you want perfect control over where the fog starts and ends

//Parameters
//color:color
//near:how far away from the camera does the fog start
//far:how far away from the camera will the fog be fully opaque

// scene.fog=new THREE.Fog('#ff0000',10,10)


//*********FogExp2

//parameters color, density:how fast will the fog become opaque 

scene.fog=new THREE.FogExp2('#03343f',0.1)


const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(directionalLightHelper)

const shadowCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(shadowCameraHelper)




const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)







/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.set(2, 2, 5)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.setClearColor('#7dcae8');

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0


const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime


    //update mixer

    mixers.forEach((mixer) => mixer.update(deltaTime));


    // floor.rotation.z=-Math.sin(elapsedTime*0.1)*3

    camera.position.z = Math.cos(elapsedTime*0.4)*5
    camera.position.x = Math.sin(elapsedTime*0.4)*5
    // camera.position.y = Math.sin(elapsedTime*0.4)*5


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()