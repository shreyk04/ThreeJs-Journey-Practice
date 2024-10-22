import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { FontLoader, GLTFLoader, TextGeometry } from 'three/examples/jsm/Addons.js'
import { color, log2, mat3, metalness, normalMap, roughness } from 'three/examples/jsm/nodes/Nodes.js'
import { Sky } from 'three/examples/jsm/Addons.js'


/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()



//Textures

const textureLoader=new THREE.TextureLoader()

const particlesTexture=textureLoader.load('./particles/11.png')

//floor
const floorAlphaTexture=textureLoader.load('./floor/alpha.jpg')



const wallColorTexture=textureLoader.load('./wall/textures/castle_brick_broken_06_diff_1k.jpg')
const wallArmTexture=textureLoader.load('./wall/textures/castle_brick_broken_06_arm_1k.jpg')
const wallNormalTexture=textureLoader.load('./wall/textures/castle_brick_broken_06_nor_gl_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace


const windowColorTexture=textureLoader.load('./win/color2.png')
// const windowArmTexture=textureLoader.load('./win/color.jpg')
const windowNormalTexture=textureLoader.load('./win/normal.jpg')
const windowRoughnessTexture=textureLoader.load('./win/roughness.jpg')
const windowDisplacementTexture=textureLoader.load('./win/height.png')
const windowAmbientOcclusionTexture=textureLoader.load('./win/ambientOcclusion.jpg')
// windowColorTexture.colorSpace.THREE.SRGBColorSpace

const roofColorTexture=textureLoader.load('./roof/textures/roof_slates_02_diff_1k.jpg')
const roofArmTexture=textureLoader.load('./roof/textures/roof_slates_02_arm_1k.jpg')
const roofNormalTexture=textureLoader.load('./roof/textures/roof_slates_02_nor_gl_1k.jpg')

roofColorTexture.colorSpace=THREE.SRGBColorSpace


roofColorTexture.repeat.set(3,1)
roofArmTexture.repeat.set(3,1)
roofNormalTexture.repeat.set(3,1)

roofColorTexture.wrapS=THREE.RepeatWrapping
roofArmTexture.wrapS=THREE.RepeatWrapping
roofNormalTexture.wrapS=THREE.RepeatWrapping

const floorColorTexture=textureLoader.load('floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg')
const floorArmTexture=textureLoader.load('floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg')
const floorNormalTexture=textureLoader.load('floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg')
const floorDisplacementTexture=textureLoader.load('floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg')

floorColorTexture.repeat.set(8,8)
floorArmTexture.repeat.set(8,8)
floorNormalTexture.repeat.set(8,8)
floorDisplacementTexture.repeat.set(8,8)

floorColorTexture.wrapS=THREE.ReactWrapping
floorArmTexture.wrapS=THREE.ReactWrapping
floorNormalTexture.wrapS=THREE.ReactWrapping
floorDisplacementTexture.wrapS=THREE.ReactWrapping



floorColorTexture.wrapT=THREE.ReactWrapping
floorArmTexture.wrapT=THREE.ReactWrapping
floorNormalTexture.wrapT=THREE.ReactWrapping
floorDisplacementTexture.wrapT=THREE.ReactWrapping








//Bushes Texture

const bushColorTexture=textureLoader.load('./bush/textures/leaves_forest_ground_diff_1k.jpg')
const bushArmTexture=textureLoader.load('./bush/textures/leaves_forest_ground_arm_1k.jpg')
const bushNormalTexture=textureLoader.load('./bush/textures/leaves_forest_ground_nor_gl_1k.jpg')


bushColorTexture.colorSpace=THREE.SRGBColorSpace

bushColorTexture.repeat.set(2,1)
bushArmTexture.repeat.set(2,1)
bushNormalTexture.repeat.set(2,1)

bushColorTexture.wrapS=THREE.RepeatWrapping
bushArmTexture.wrapS=THREE.RepeatWrapping
bushNormalTexture.wrapS=THREE.RepeatWrapping


//grave

const graveColorTexture=textureLoader.load('./grave/textures/plastered_stone_wall_diff_1k.jpg')
const graveArmTexture=textureLoader.load('./grave/textures/plastered_stone_wall_arm_1k.jpg')
const graveNormalTexture=textureLoader.load('./grave/textures/plastered_stone_wall_nor_gl_1k.jpg')

graveColorTexture.colorSpace=THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3,0.4)
graveArmTexture.repeat.set(0.3,0.4)
graveNormalTexture.repeat.set(0.3,0.4)



//door Texture
const doorColorTexture=textureLoader.load('./door/color.jpg')
const doorAlphaTexture=textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture=textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture=textureLoader.load('./door/height.jpg')
const doorNormalTexture=textureLoader.load('./door/normal.jpg')
const doorRoughnessTexture=textureLoader.load('./door/roughness.jpg')
const doorMetalnessTexture=textureLoader.load('./door/metalness.jpg')


doorColorTexture.colorSpace=THREE.SRGBColorSpace


/**
 * House
 */
// Temporary sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial({ roughness: 0.7 })
)
// scene.add(sphere)


//Floor

const floor=new THREE.Mesh(
    new THREE.PlaneGeometry(20,20,100,100),
    new THREE.MeshStandardMaterial({
        side:THREE.DoubleSide,
        alphaMap:floorAlphaTexture,
        map:floorColorTexture,
        aoMap:floorArmTexture,
        roughnessMap:floorArmTexture,
        metalnessMap:floorArmTexture,
        normalMap:floorNormalTexture,
        displacementMap:floorDisplacementTexture,
        displacementScale:0.3,
        displacementBias:-0.17

    })
)

floor.rotation.x=-Math.PI*0.5
scene.add(floor)


gui.add(floor.material,'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
gui.add(floor.material,'displacementBias').min(-1).max(1).step(0.01).name('floorDisplacementBias')








//house container

const house=new THREE.Group()
scene.add(house)

//walls

const walls=new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map:wallColorTexture,
        aoMap:wallArmTexture,
        roughnessMap:wallArmTexture,
        normalMap:wallNormalTexture,
        side:THREE.DoubleSide
    })
)
walls.position.y=1.25
house.add(walls)

const axesHelper=new THREE.AxesHelper(10)
scene.add(axesHelper)

//roof

const roof=new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1.5,4),
    new THREE.MeshStandardMaterial({
        map:roofColorTexture,
        aoMap:roofArmTexture,
        roughnessMap:roofArmTexture,
        normalMap:roofNormalTexture

    })

)
roof.position.y=2.5+0.75
roof.rotation.y=Math.PI/2/2


house.add(roof)


//door

const door=new THREE.Mesh(
    new THREE.PlaneGeometry(2.2,2.2,100,100),
    new THREE.MeshStandardMaterial({
        map:doorColorTexture,
        transparent:true,
        aoMap:doorAmbientOcclusionTexture,
        alphaMap:doorAlphaTexture,
        displacementMap:doorHeightTexture,
        displacementScale:0.15,
        displacementBias:-0.04,
        normalMap:doorNormalTexture,
        roughnessMap:doorRoughnessTexture,
        metalnessMap:doorMetalnessTexture
    })

)

door.position.y=1
door.position.z=2+0.01
house.add(door)



//window

const winGeometry=new THREE.BoxGeometry(1,1,0.07)
const winMaterial=new THREE.MeshStandardMaterial({side:THREE.DoubleSide,
    map:windowColorTexture,
    transparent:true,
    side:THREE.DoubleSide

    // aoMap:windowAmbientOcclusionTexture,
    // roughnessMap:windowRoughnessTexture,
    // normalMap:windowNormalTexture,
    // displacementMap:windowDisplacementTexture
})
// winMaterial.map=windowColorTexture
const win=new THREE.Mesh(winGeometry,winMaterial)


// scene.add(win)
win.position.y=1.5
win.position.z=0
win.position.x=2
win.rotation.y=-Math.PI/2
win.receiveShadow=true
win.castShadow=true
house.add(win)




// That Glitch is called "z-fighting"
//when two faces are mathematically in the exact same spot,the GPU doesn't know which one is in front of the other
//so slightly move away  object



//Bushes
const bushGeometry=new THREE.SphereGeometry(1,16,16)
const bushMaterial=new THREE.MeshStandardMaterial({
    color:'#ccffcc',
    map:bushColorTexture,
    aoMap:bushArmTexture,
    roughnessMap:bushArmTexture,
    metalnessMap:bushArmTexture,
    normalMap:bushNormalTexture
})


//bush1
const bush1=new THREE.Mesh(bushGeometry,bushMaterial)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.9,0.2,2.2)
bush1.rotation.x=-0.75
// house.add(bush1)


//bush2
const bush2=new THREE.Mesh(bushGeometry,bushMaterial)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4,0.1,2.1)
bush2.rotation.x=-0.75
// house.add(bush2)

//bush3
const bush3=new THREE.Mesh(bushGeometry,bushMaterial)
bush3.scale.set(0.4,0.4,0.4)
bush3.position.set(-0.8,0.1,2.2)
bush3.rotation.x=-0.75
// house.add(bush3)

//bush4
const bush4=new THREE.Mesh(bushGeometry,bushMaterial)
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1.2,0.1,2.5)
bush4.rotation.x=-0.75
// house.add(bush4)

house.add(bush1,bush2,bush3,bush4)


//graves

const graveGeometry=new THREE.BoxGeometry(0.6,0.8,0.2)
const graveMaterial=new THREE.MeshStandardMaterial(
    {
        map:graveColorTexture,
        aoMap:graveArmTexture,
        roughnessMap:graveArmTexture,
        metalnessMap:graveArmTexture,
        normalMap:graveNormalTexture
    }
)

const graves=new THREE.Group()
scene.add(graves)


for(let i=0;i<30;i++){


    const angle=Math.random()*Math.PI*2
    // console.log(angle);
    
    const radius=3+Math.random()*4
    console.log(Math.random());
    
    const x=Math.sin(angle)*radius
    const z=Math.cos(angle)*radius


    //mesh

    const grave=new THREE.Mesh(graveGeometry,graveMaterial)
    grave.position.x=x
    grave.position.y=Math.random()*0.4
    grave.position.z=z

    grave.rotation.x=(Math.random()-0.5)*0.4
    grave.rotation.y=(Math.random()-0.5)*0.4
    grave.rotation.z=(Math.random()-0.5)*0.4
    graves.add(grave)
}

const walkingSphereGeo = new THREE.BoxGeometry(0.5,0.5,0.5);

const walkingSphereGroup = new THREE.Group();


const walkingSphere = new THREE.Mesh(walkingSphereGeo, new THREE.MeshStandardMaterial({color:0xff0000}))

// walkingSphereGroup.add(walkingSphere);
// scene.add(walkingSphere);


// walkingSphereGroup.position.set(10,0.25,0)
walkingSphere.position.set(10,0.25,0)


//text
const fontLoader=new FontLoader()
const result=fontLoader.load('/fonts/helvetiker_regular.typeface.json',
    (font)=>{
        
        const textGeometry = new TextGeometry(
            'Haunted House',
            {
                font: font,
                size: 1,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5

            }
        )
        textGeometry.center()
        const textMaterial=new THREE.MeshStandardMaterial({color:"#e0ded7"})
        const text=new THREE.Mesh(textGeometry,textMaterial)
        text.position.x=1
        text.position.z=8
        text.position.y=0.55
        text.castShadow=true
        scene.add(text)
        console.log(text);
        
    }
)
console.log(result);





//3D MODEL

const loader=new GLTFLoader()
loader.load('/models/clockTower1.glb',function(gltf){
    const clockTower=gltf.scene
    scene.add(clockTower)
    clockTower.scale.multiplyScalar(0.5)
    clockTower.position.set(-5,0,0)
    clockTower.rotation.y=Math.PI*1.5
    console.log(gltf);
    camera.lookAt(gltf.scene)
    
})




















/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.2)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 0.5)
directionalLight.position.set(3,2,-10)
directionalLight.castShadow=true
// directionalLight.shadow.camera.top=2
// directionalLight.shadow.camera.right=10
// directionalLight.shadow.camera.left=0
// directionalLight.shadow.camera.bottom=-10
// directionalLight.shadow.radius = 3;
// console.log(directionalLight.shadow.camera);


const directionalLightHelper=new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)
scene.add(directionalLight)



const doorLight=new THREE.PointLight('#ff7d46',4)
doorLight.position.set(0,2.4,2.5)
house.add(doorLight)



//Ghosts

const ghost1=new THREE.PointLight('#d929b9',5)
ghost1.position.set(0,0,4)
house.add(ghost1)


const ghost2=new THREE.PointLight('#4a44b8',5)
ghost2.position.set(0,0,8)
house.add(ghost2)

const ghost3=new THREE.PointLight('#08a310',3.4)
console.log(ghost3.camera);

ghost3.position.set(5,0,5)

house.add(ghost3)




const  textLight=new THREE.PointLight('#a3033e',2)
textLight.position.set(0,0,8)
house.add(textLight)

const  textLight2=new THREE.PointLight('#a35b03',2)
textLight2.position.set(0,0,8)
house.add(textLight2)



//SKY

const sky=new Sky()
sky.scale.set(100,100,100)
scene.add(sky)

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
camera.position.x = 0
camera.position.y = 2
camera.position.z = 10

console.log(camera);
// scene.add(camera)


// walkingSphereG/\roup.add(camera);
scene.add(camera);


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.minPolarAngle = THREE.MathUtils.degToRad(10)
controls.maxPolarAngle = THREE.MathUtils.degToRad(85);
// controls.maxZoom = 2;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//SHadows



renderer.shadowMap.enabled = true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap

ghost1.castShadow=true
ghost2.castShadow=true
ghost3.castShadow=true

walls.castShadow=true
walls.receiveShadow=true
roof.castShadow=true
floor.receiveShadow=true

for(const grave of graves.children)
{
    grave.castShadow=true
    grave.receiveShadow=true
}




//Particles

const particleGeometry=new THREE.BufferGeometry()
const count=5000

const positions=new Float32Array(count*3)

for(let i=0;i<count*3;i++){
    positions[i]=(Math.random()-0.5)*20
}

particleGeometry.setAttribute('position',
    new THREE.BufferAttribute(positions,3)
)

const particleMaterial=new THREE.PointsMaterial()
particleMaterial.size=0.03
particleMaterial.sizeAttenuation=true
// particleMaterial.map=particlesTexture
particleMaterial.transparent=true
particleMaterial.alphaMap=particlesTexture



//points
const particles=new THREE.Points(particleGeometry,particleMaterial)
scene.add(particles)



/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()
//     particles.position.y-=0.04;
//    if(particles.position.y<-5){
//         particles.position.y=10  
//    }

    particles.position.y = -(elapsedTime*1.4)%5;

    
   
    walkingSphereGroup.position.x = (Math.cos(elapsedTime*0.1) * 10);
    walkingSphereGroup.position.z = (Math.sin(elapsedTime*0.1) * 10);

    //multiply elapsedtime by 0.3 to slow down 
    const ghostAngle1=elapsedTime*0.4
    const ghostAngle2=elapsedTime*0.6
    const ghostAngle3=elapsedTime*0.5


    ghost1.position.x=(Math.cos(ghostAngle1)*7)
    ghost1.position.z=(Math.sin(ghostAngle1)*7)
    ghost1.position.y=Math.sin(ghostAngle1)*Math.sin(ghostAngle1*2.34)*Math.sin(ghostAngle1*3.45)


    ghost2.position.x=Math.sin(ghostAngle2)*9
    ghost2.position.z=Math.cos(ghostAngle2)*9
    ghost2.position.y=Math.sin(ghostAngle2)*Math.sin(ghostAngle2*2.34)

    ghost3.position.x=Math.cos(ghostAngle3)*5
    ghost3.position.z=Math.sin(ghostAngle3)*5
    ghost3.position.y=Math.sin(ghostAngle3)*Math.sin(ghostAngle3*2.34)*Math.sin(ghostAngle3*3.45)



    textLight.position.x=Math.sin(elapsedTime*0.5)*4.7
    textLight2.position.x=-Math.sin(elapsedTime*0.5)*4.7
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)


}

tick()