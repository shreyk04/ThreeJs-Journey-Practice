import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'





const gui=new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


const textureLoader=new THREE.TextureLoader()
const cubeTextureLoader=new THREE.CubeTextureLoader()
const colorTexture=textureLoader.load('./textures/door/color.jpg')
const mapcapTexture=textureLoader.load('/textures/matcaps/1.png')
const gradientTexture=textureLoader.load('./textures/gradients/5.jpg')
const doorAmbientOcclusionTexture=textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture=textureLoader.load('/textures/height.jpg')
const doorMetalnessTexture=textureLoader.load('/textures/roughness.jpg')
const doorRoughnessTexture=textureLoader.load('/textures/metalness.jpg')
const doorNormalTexture=textureLoader.load('/textures/normal.jpg')
gradientTexture.minFilter=THREE.NearestFilter
gradientTexture.magFilter=THREE.NearestFilter


const environmentMapTexture=cubeTextureLoader.load([
    '/textures/environmentMap/2/px.png',
    '/textures/environmentMap/2/nx.png',
    '/textures/environmentMap/2/py.png',
    '/textures/environmentMap/2/ny.png',
    '/textures/environmentMap/2/pz.png',
    '/textures/environmentMap/2/nz.png',
])


//Create 3 Meshes composed of 3 different geometries (a sphere, a plane, and a torus) and use the same MeshBasicMaterial on all of the 3. Yes, you can use one material on multiple meshes. Move the sphere on the left and the torus on the right to separate them.


// const material=new THREE.MeshBasicMaterial({map:colorTexture})

// material.color=new THREE.Color(0x00ff00)
// material.opacity=0.4
// material.transparent=true
// material.side=THREE.DoubleSide


//****Mesh Normal Material **********/
//Normals can be used for lighting,refraction,reflection


// const material=new THREE.MeshNormalMaterial()
// material.wireframe=true
// material.flatShading=true


// ********MESH MATCAP MATERIAL********
// const material=new THREE.MeshMatcapMaterial()
// material.matcap=mapcapTexture


// ********MESHDEPTH MATERIAL********
//MESHDEPTH Material will simply color the geometry in white if its close to the near and in black if its close to far value of the camera
// const material=new THREE.MeshDepthMaterial()


//********MeshLambert Material******/
//It will react to light
// const material=new THREE.MeshLambertMaterial()

// const material=new THREE.MeshStandardMaterial()


//****MeshPhong Material*****/
//it is similar to meshLambertMaterial but the strange patterns are less visible and we can also see the light reflection

// const material=new THREE.MeshPhongMaterial()
//we can control light reflection with shininess and color of this reflection with specular
// material.shininess=1000
// material.specular=new THREE.Color(0xff0000)



//*********Mesh Toon Material***********/

// const material=new THREE.MeshToonMaterial()
// material.gradientMap=gradientTexture




//*********Mesh Standard Material ********/

const material=new THREE.MeshStandardMaterial()
material.roughness=0.3
material.metalness=0.5
material.envMap=environmentMapTexture


// material.map=colorTexture
// material.aoMap=doorAmbientOcclusionTexture
// material.aoMapIntensity=1

//displacementMap will move the vertices to create relif
// material.displacementMap=doorHeightTexture
// material.wireframe=true

// material.metalnessMap=doorMetalnessTexture
// material.roughnessMap=doorRoughnessTexture
// material.normalMap=doorNormalTexture
// material.normalScale.set(0.5,0.5)
// material.transparent=true


gui.add(material,'metalness').min(0).max(1).step(0.0001)
gui.add(material,'roughness').min(0).max(1).step(0.0001)
gui.add(material,'aoMapIntensity').min(0).max(10).step(0.01)


material.side=THREE.DoubleSide

const sphere=new THREE.Mesh(new THREE.SphereGeometry(1,32,16),material)
const plane=new THREE.Mesh(new THREE.PlaneGeometry(1,1),material)
const torus=new THREE.Mesh(new THREE.TorusGeometry(0.3,0.2,16,32),material)

sphere.position.x=-1
sphere.position.y=-1
plane.position.x=1
torus.position.y=1
scene.add(sphere,plane,torus)



// *********LIGHTS********

const ambientLight=new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambientLight)

const pointLight=new THREE.PointLight(0xffffff,1)

pointLight.position.x=4
pointLight.position.y=1
pointLight.position.z=3
pointLight.intensity=50
scene.add(pointLight)






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
camera.position.x = 1
camera.position.y = 1
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


tick()