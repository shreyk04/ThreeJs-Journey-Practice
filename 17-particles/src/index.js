import * as THREE from 'three'
import { OrbitControls, Timer } from 'three/examples/jsm/Addons.js'

const scene = new THREE.Scene()


const canvas = document.querySelector('canvas.webgl')


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: "red" })
)
// scene.add(cube)



const circle = new THREE.Mesh(new THREE.CircleGeometry(0.5, 40), new THREE.MeshStandardMaterial({
    color: 'red',
    side: THREE.DoubleSide
}))
// circle.position.x=1
scene.add(circle)



const clock = new THREE.Group()
scene.add(clock)


const material = new THREE.LineBasicMaterial({ color: 0x0000ff })
const material2 = new THREE.LineBasicMaterial({ color: 0x00ffff })


const points = []
points.push(new THREE.Vector3(0, 0, 0))
points.push(new THREE.Vector3(0.5, 0.5, 0))
const points2 = []
points2.push(new THREE.Vector3(0, 0, 0))
points2.push(new THREE.Vector3(0.5, 0.1, 0))
// points.push(new THREE.Vector3(1,0,0))


const geometry = new THREE.BufferGeometry().setFromPoints(points)
const geometry2 = new THREE.BufferGeometry().setFromPoints(points2)

const line = new THREE.Line(geometry, material)
const line2 = new THREE.Line(geometry2, material2)
line.position.x = 1
// scene.add(line)
// scene.add(line2)

clock.add(line)
clock.add(line2)

console.log(line2);
console.log(line2);



const ambientLight = new THREE.AmbientLight('white', 1)
ambientLight.position.z = 3
scene.add(ambientLight)

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


})

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)


//orbit controls
const controls = new OrbitControls(camera, canvas)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



const timer = new Timer()
const animate = () => {

    timer.update()
    const elapsedTime = timer.getElapsed()
    // line2.rotation.x=Math.tan(elapsedTime)*0.5
    line2.rotation.x = Math.sin(elapsedTime)
    line2.rotation.z = -Math.cos(elapsedTime)
    // line2.up.x=-elapsedTime


    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate()
