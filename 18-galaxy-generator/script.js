import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js'


//scene
const scene=new THREE.Scene()

const canvas=document.querySelector('canvas.webgl')


const gui=new GUI()

//GALAXY


const parameters={}
parameters.count=1000
parameters.size=0.02
parameters.radius=2
parameters.branches=3


let geometry=null
let material=null
let points=null



const generateGalaxy = () =>
    
    {

         if(points!==null){
            geometry.dispose()
            material.dispose()
            scene.remove(points)
         }


        /**
         * Geometry
         */
         geometry = new THREE.BufferGeometry()
    
        const positions = new Float32Array(parameters.count * 3)
    
        for(let i = 0; i < parameters.count; i++)
        {
            const i3 = i * 3

            const radius=Math.random()*parameters.radius

            const branchAngle=(i%parameters.branches) /parameters.branches*Math.PI*2
              
            console.log(branchAngle);
            
            positions[i3] =Math.cos(branchAngle)*radius
            positions[i3 + 1] =0 
            positions[i3 + 2] = Math.sin(branchAngle)*radius


        }
       

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    
    //MAterial
     material=new THREE.PointsMaterial({
        size:parameters.size,
        sizeAttenuation:true,
        depthWrite:false,
        blending:THREE.AdditiveBlending
    })

    //POINTS

     points=new THREE.Points(geometry,material)
    scene.add(points)

    // console.log(positions);
    
}
generateGalaxy()




gui.add(parameters,'count').min(100).max(100000).step(100).onFinishChange(generateGalaxy)
gui.add(parameters,'size').min(0.01).max(0.1).step(0.001).onFinishChange(generateGalaxy)
gui.add(parameters,'radius').min(2).max(50).step(2).onFinishChange(generateGalaxy)
gui.add(parameters,'branches').min(2).max(10).step(1).onFinishChange(generateGalaxy)



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