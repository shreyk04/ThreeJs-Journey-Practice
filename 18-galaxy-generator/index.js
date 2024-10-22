import * as THREE from 'three'
import { FontLoader, OrbitControls, TextGeometry } from 'three/examples/jsm/Addons.js'


//scene
const scene=new THREE.Scene()

const canvas=document.querySelector('canvas.webgl')




const plane=new THREE.Mesh(
    new THREE.PlaneGeometry(5,5),
    new THREE.MeshStandardMaterial({
        side:THREE.DoubleSide,
       

    })
)

// plane.rotation.x=-Math.PI*10
plane.rotation.y=Math.PI
plane.receiveShadow=true
scene.add(plane)


//TEXT

const fontLoader=new FontLoader()
const result=fontLoader.load('/static/fonts/droid_serif_regular.typeface.json',
    (font)=>{
        const textGeometry=new TextGeometry(
            'Three.js Simple Text',
            {
                font:font,
                size:0.5,
                height: 0.1,
                curveSegments: 11,
                bevelEnabled: true,
                bevelThickness: 0.0001,
                bevelSize: 0.001,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        textGeometry.center()
        const textMaterial=new THREE.MeshNormalMaterial()
        const text=new THREE.Mesh(textGeometry,textMaterial)
        text.position.y=0.4
        scene.add(text)

        text.castShadow=true

        // console.log(font);
        
    }
)
console.log(result);



//light
const ambientLight=new THREE.AmbientLight('0xffffff',1.5)
scene.add(ambientLight)


const directionalLight=new THREE.DirectionalLight('0xffffff',0.5)
scene.add(directionalLight)
directionalLight.position.set(0,0,2)
directionalLight.castShadow=true

const directionalLightHelper=new THREE.DirectionalLightHelper(directionalLight)
scene.add(directionalLightHelper)


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

renderer.shadowMap.enabled = true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap

const controls=new OrbitControls(camera,canvas)



const animate=()=>{
    controls.update()

    renderer.render(scene,camera)

    requestAnimationFrame(animate)
}
animate()