import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


console.log(typefaceFont);


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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()



const matcapTexture = textureLoader.load('/textures/matcaps/8.png')



//fonts

const fontLoader = new FontLoader()
fontLoader.load(
    // '/fonts/helvetiker_regular.typeface.json',
    '/fonts/gentilis_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Hey Three.js',
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

        //instead of using 2 same material for donut and text use same
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })



        // const material=new THREE.MeshStandardMaterial({map:matcapTexture})


        //  const textMaterial=new THREE.MeshMatcapMaterial({matcap:matcapTexture})
        //  textMaterial.wireframe=true
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)


        //we can use the same material and same geometry on multiple meshes
        //so write both outside of for loop so that it will create only one material and geometry

        console.time('donuts')

        // const donutMaterial=new THREE.MeshMatcapMaterial({matcap:matcapTexture})
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)


        for (let i = 0; i < 100; i++) {
            const donut = new THREE.Mesh(donutGeometry, material)

            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            // donut.rotation.x=Math.random()* Math.PI
            // donut.rotation.y=Math.random()*Math.PI


            const scale = Math.random()
            donut.scale.set(scale, scale, scale)
            scene.add(donut)
        }
        console.timeEnd('donuts')

    }






)





//Bounding

//The bounding is an information associated with the geometry that tells what space is taken by that geometry
//It can be a box or a sphere






/**
 * Object
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)

// scene.add(cube)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()