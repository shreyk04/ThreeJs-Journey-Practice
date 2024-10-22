import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Fog
 */
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog = fog

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')

const glassColorTexture = textureLoader.load('/textures/win/color.jpg')
const glassAmbientOcclusionTexture = textureLoader.load('/textures/win/ambientOcclusion.jpg')
const glassNormalTexture = textureLoader.load('/textures/win/normal.jpg')
const glassRoughnessTexture = textureLoader.load('/textures/win/roughness.jpg')
const glassOpacityTexture = textureLoader.load('/textures/win/opacity.jpg')
const glassMetalicTexture = textureLoader.load('/textures/win/metallic.jpg')
//const glassMaterialTexture = textureLoader.load('/textures/win/Material.jpg')

const glassHeightTexture = textureLoader.load('/textures/win/height.png')
const glassbrokTexture = textureLoader.load('/textures/win/istock.jpg')

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')

grassColorTexture.repeat.set(8, 8)
grassAmbientOcclusionTexture.repeat.set(8, 8)
grassNormalTexture.repeat.set(8, 8)
grassRoughnessTexture.repeat.set(8, 8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * House
 */
//Group
const house = new THREE.Group()
scene.add(house)

//walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: bricksColorTexture,
        aoMap: bricksAmbientOcclusionTexture,
        normalMap: bricksNormalTexture,
        roughnessMap: bricksRoughnessTexture
    })
)
walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))
walls.position.y = 2.5 / 2
house.add(walls)

//pyramid Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({color: '#b35f45'})
)
roof.rotation.y = Math.PI * 0.25 // or PI / 4
roof.position.y = 2.5 + 0.5
house.add(roof)


//door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
         map: doorColorTexture,
         transparent: true,
         alphaMap: doorAlphaTexture,
         aoMap: doorAmbientOcclusionTexture,
         displacementMap: doorHeightTexture,
         displacementScale: 0.1,
         normalMap: doorNormalTexture,
         metalnessMap: doorMetalnessTexture,
         roughnessMap: doorRoughnessTexture
    })

)

door.geometry.setAttribute(
    'uv2',
     new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
)

door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

//window
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(512);
const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);

const glassMaterial = new THREE.MeshPhysicalMaterial({
    //color: '#ffffff',
    //opacity: 0,
    map: glassColorTexture,
    transparent: true,
    aoMap: glassAmbientOcclusionTexture,
    displacementMap: glassHeightTexture,
    displacementScale: 0.1,
    normalMap: glassNormalTexture,
    roughnessMap: glassRoughnessTexture,
   // metalnessMap: glassMaterialTexture,
    metalicMap: glassMetalicTexture,
    opacityMap: glassOpacityTexture,
    metalness: 1,
    roughness: 1,
    envMap: cubeRenderTarget.texture,
    refractionRatio: 0.96,
});

gui.add(glassMaterial, 'roughness').min(0).max(1).step(0.001)
gui.add(glassMaterial, 'metalness').min(0).max(1).step(0.001)

const windowGeometry = new THREE.PlaneGeometry(1.1, 1.1, 30, 30);
const windowMesh = new THREE.Mesh(windowGeometry, glassMaterial);
windowMesh.position.set(2, 1.50, 0); 
windowMesh.rotation.y = Math.PI / 2;
scene.add(windowMesh);


windowMesh.geometry.setAttribute(
    'uv2',
     new THREE.Float32BufferAttribute(windowMesh.geometry.attributes.uv.array, 2)
)

// Chimney
const chimney = new THREE.Mesh(
new THREE.BoxGeometry(0.5, 1.5, 0.5),
new THREE.MeshStandardMaterial({color: "#b35f45"})
)
chimney.position.set(-1.5, 2 + 0.75, 0.5)
chimney.rotation.z = Math.PI * 0.1 
house.add(chimney);

// Chimney smoke

const particleCount = 1000; 

const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1); 
const material = new THREE.MeshBasicMaterial({color: 0x3a3d52, opacity:0.7}); 
const particles = new THREE.Group(); 

for (let i = 0; i < particleCount; i++) {
    const particle = new THREE.Mesh(geometry, material);
  
    particle.position.set(

        chimney.position.x + (Math.random() - 0.5) * 0.3 - 0.2, 
        chimney.position.y + chimney.scale.y / 2 + Math.random() * 0.3 , 
        chimney.position.z + (Math.random() - 0.5) * 0.1 
    );
    particles.add(particle); 
}

scene.add(particles);


//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

// Graves
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({ color: '#b2b6b1' })

for(let i = 0; i < 50; i++)
{
    const angle = Math.random() * Math.PI * 2 // Random angle
    const radius = 3 + Math.random() * 6      // Random radius
    const x = Math.cos(angle) * radius        // Get the x position using cosinus
    const z = Math.sin(angle) * radius        // Get the z position using sinus

    // Create the mesh
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    // Position
    grave.position.set(x, 0.3, z)                              

    // Rotation
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.castShadow = true
    // Add to the graves container
    graves.add(grave)
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAmbientOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)


// Door light
const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
doorLight.position.set(0, 2.2, 2.7)
house.add(doorLight)

// Set up the light interval timer
let isLightOn = true;
setInterval(() => {
  if (isLightOn) {
    // Turn off the light after 2 seconds
    setTimeout(() => {
      doorLight.visible = false;
      isLightOn = false;
    }, 500);
  } else {
    // Turn on the light after 1 second
    setTimeout(() => {
      doorLight.visible = true;
      isLightOn = true;
    }, 1000);
  }
}, 3000);

/**
 * Ghosts
 */

const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
scene.add(ghost1)

const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
scene.add(ghost2)

const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
scene.add(ghost3)

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
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
renderer.setClearColor('#262837')

/**
 * Shadows
 */
renderer.shadowMap.enabled = true 
renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.castShadow = true
doorLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true
bush4.castShadow = true

floor.receiveShadow = true

moonLight.shadow.mapSize.width = 256
moonLight.shadow.mapSize.height = 256
moonLight.shadow.camera.far = 15

// ...

doorLight.shadow.mapSize.width = 256
doorLight.shadow.mapSize.height = 256
doorLight.shadow.camera.far = 7

// ...

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 7

// ...

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 7

// ...

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 7


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
   
    // Ghosts
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2Angle = - elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 5
    ghost2.position.z = Math.sin(ghost2Angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3Angle = - elapsedTime * 0.18
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    // Update controls
    controls.update()
    //Update Mirror
    cubeCamera.position.copy(windowMesh.position);
    cubeCamera.update(renderer, scene);

    //chimny stomk
    particles.children.forEach((particle) => { 
        particle.position.y += Math.random() * 0.03; 
        if (particle.position.y > 4.5) { // 
            particle.position.y = 3;
        }
        particle.rotation.z += Math.random() * 0.1; 
     });

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()