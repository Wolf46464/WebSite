//versio 0.160.0
//Portfolio Abought me Contact
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js';

import { FontLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://unpkg.com/three@0.160.0/examples/jsm/geometries/TextGeometry.js';





const scene = new THREE.Scene();
const scene_1 = new THREE.Scene();
scene.background = new THREE.Color(0x111111);


const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(0, 35, 0);
camera.lookAt(0, 0, 0);


camera.near = 0.1;
camera.far = 500;
camera.updateProjectionMatrix();




const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 1.2));



const dir = new THREE.DirectionalLight(0xffffff, 1);
dir.position.set(75 , 100, 0);
scene.add(dir);



let Tablet= null;
let screen_01=null;

let Fan1 = null;
let Fan2 = null;
let Gear1 = null;
let Gear2 = null; 
let Gear3 = null;
let Gear4 = null;
let Gear_Core= null;

let StartButton = null;
let Button_CV = null;
let Button_Hakemus= null;
let Button_Info= null;

let circuit_01= null;
let circuit_02= null;
let circuit_03= null;
let Glass_Tube= null;

let Start_Position_CV= null;
let Start_Position_Info= null;
let Start_Position_Hakemus= null;
let Pressed_Button= 0;
let Start_Button_pressed= false;

//const vector3_1= new THREE.Vector3(0,0,0);





//Mouse coordinates
const mouse = {
  x: 0,
  y: 0
};





const mapLoad = new THREE.CubeTextureLoader();
mapLoad.setPath( './public/Standard-Cube-Map/' );
const textureCube = mapLoad.load( [
	'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'
] );




//Materials
const Material_0 = new THREE.MeshBasicMaterial({
      color: 0x00ff00, 
      envMap: textureCube
      
    });
const Material_1 = new THREE.MeshBasicMaterial({
      color: 0x777777, 
      envMap: textureCube
      
    });

const Material_2 = new THREE.MeshStandardMaterial({
      color: 0xff1111,  
      emissive: 0x000000,
      metalness: 0.1,
      roughness: 0.9,
      envMap: textureCube,
      //flatShading: true
    });

const Material_3 = new THREE.MeshStandardMaterial({
      color: 0x00008B,   
      emissive: 0x000000, 
      metalness: 0.6,
      roughness: 0.2
    });

const Material_4 = new THREE.MeshBasicMaterial({
      color: 0xbb11bb, 
      envMap: textureCube
      
    });
const Material_5 = new THREE.MeshBasicMaterial({
      color: 0xbbffbb, 
      transparent: true,
      opacity: 0.7,
      envMap: textureCube

    });
const Material_6 = new THREE.MeshBasicMaterial({
      color: 0xcccc00, 
      transparent: true,
      opacity: 0.7,
      envMap: textureCube

    });
const Material_7 = new THREE.MeshStandardMaterial({
      color: 0x01ffff, 
      //transparent: true,
      //opacity: 0.7,
	  metalness: 0.8,
      envMap: textureCube

    });




const Material_Black = new THREE.MeshStandardMaterial({
  color: 'black',
  envMap: textureCube
  //wireframe: true
});

const Material_White = new THREE.MeshStandardMaterial({
  color: 0xeeeeee,
  //metalness: 0.8,
  //roughness: 0.2,
  envMap: textureCube
});

const Material_Yellow = new THREE.MeshStandardMaterial({
  color: 0xeeee00,
  metalness: 0.1,
  roughness: 0.1,
  envMap: textureCube
});

const screenMaterial = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  color: 0x000000
  
});

//Load GLTF model and set materials

//const vector3_1= new THREE.Vector3(0,0,0);


//Load GLTF model
const loader = new GLTFLoader();
loader.load('./public/Tablet_3d_END.glb', (gltf) => {
    gltf.scene.traverse((child) => {
        //console.log(child.name, child.type);
        console.log("Child name: ", child.name);
        //Buttons
        if ( child.name === 'Button_0' ){
            child.material = Material_4;
            StartButton = child;
        
            
        }
        else if (child.name === 'Button_1'){
            child.material = Material_4;
            Button_CV = child;
            Start_Position_CV =  child.quaternion.clone();
        }
        else if (child.name === 'Button_2'){
            child.material = Material_4;
            Button_Hakemus = child;
            Start_Position_Hakemus = child.quaternion.clone();
        }
        else if (child.name === 'Button_3'){
            child.material = Material_4;
            Button_Info = child;
            Start_Position_Info = child.quaternion.clone();
        }
        //Circuits
        else if (child.name === 'Circuit_1' || child.name === 'Circuit_2'|| child.name==='Cube023' ||  child.name === 'StartCircuit'){
            child.material = Material_0;
        }
        else if (child.name === 'Circuit_Fan'){
            child.material = Material_0;
            circuit_01 = child;
             
        }
        else if (child.name === 'Circuit_Info'){
            circuit_02 = child;
            child.material = Material_0;    
        }
        else if (child.name === 'Circuit_CV'){
            child.material = Material_0;
            circuit_03 = child;
        }
        //Fans
        else if (child.name === 'Fan_1'){
            child.material = Material_Black;
            Fan1 = child;
        }
        else if (child.name === 'Fan_2'){
            child.material = Material_Black;
            Fan2 = child;
            
        }
        //Gears
        else if(child.name === 'Gear_1'){
            child.material = Material_Black;
            Gear1 = child;
            
        }
        else if(child.name === 'Gear_2'){
            child.material = Material_Black;
            Gear2 = child;
            
        }
        else if(child.name === 'Gear_3'){
            child.material = Material_Black;
            Gear3 = child;
            
        }
        else if(child.name === 'Gear_4'){
            child.material = Material_Black;
            Gear4 = child;
            
        }
        else if(child.name === 'Screen_2'){
            //child.material = Material_Black;
            
            screen_01 = child;
            screen_01.material = screenMaterial;


        }
        else if(child.name === 'GlasTube'){
            child.material = Material_5;
            
        }
        else if(child.name === 'Core'){
            child.material = Material_Black;
            Gear_Core = child;
        }
        else if(child.name === 'Wire_1')
          {
            child.material = Material_Yellow;
          }
        else if(child.name === 'Resistor_1' || child.name === 'Resistor_2' ){
            child.material = Material_7;
        }

        else if(child.name === 'Condensator_1' ){
            child.material = Material_7;
        }
        else if(child.name === 'Led_1' ){
            child.material = Material_7;
        }

        else{
            child.material = Material_1;
        }

        //console.log(Tablet.position + "hello WORLD!");
});


//Create 3D Text for the button
const fontLoader = new FontLoader();
fontLoader.load(
  'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
  (font) => {

    const textGeo = new TextGeometry('START', {
      font: font,
      size: 1,
      height: 0.05,
      curveSegments: 6,
      bevelEnabled: false
    });
    textGeo.center();
    const textMat = new THREE.MeshBasicMaterial({
      color: 0x000000
    });
    const textMesh = new THREE.Mesh(textGeo, textMat);
    textMesh.rotation.set(0  , 0,-Math.PI / 2);
    textMesh.position.set(0, 0, 1);
    StartButton.add(textMesh); 
  }
);

const fontLoader2 = new FontLoader();
fontLoader2.load(
  'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
  (font) => {

    const textGeo = new TextGeometry('Portfolio', {
      font: font,
      size: 0.9,
      height: 0.05,
      curveSegments: 6,
      bevelEnabled: false
    });
    textGeo.center();
    const textMat = new THREE.MeshBasicMaterial({
      color: 0x000000
    });
    const textMesh = new THREE.Mesh(textGeo, textMat);
    textMesh.rotation.set(0, 0, 0);
    textMesh.position.set(0, 0.1, 0);
    circuit_01.add(textMesh); 
  }
);

const fontLoader3 = new FontLoader();
fontLoader3.load(
  'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
  (font) => {

    const textGeo = new TextGeometry('About Me', {
      font: font,
      size: 0.9,
      height: 0.05,
      curveSegments: 6,
      bevelEnabled: false
    });
    textGeo.center();
    const textMat = new THREE.MeshBasicMaterial({
      color: 0x000000
    });
    const textMesh = new THREE.Mesh(textGeo, textMat);
    textMesh.rotation.set(0, 0, 0);
    textMesh.position.set(0, 0.1, 0);
    circuit_02.add(textMesh); 
  }
);
    
const fontLoader4 = new FontLoader();
fontLoader4.load(
  'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json',
  (font) => {

    const textGeo = new TextGeometry('Contact', {
      font: font,
      size: 0.9,
      height: 0.05,
      curveSegments: 6,
      bevelEnabled: false
    });
    textGeo.center();
    const textMat = new THREE.MeshBasicMaterial({
      color: 0x000000
    });
    const textMesh = new THREE.Mesh(textGeo, textMat);
    textMesh.rotation.set(0, 0, 0);
    textMesh.position.set(0, 0.1, 0);
    circuit_03.add(textMesh); 
  }
);


























    Tablet = gltf.scene;
    console.log("Tablet position:::", Tablet.position);
    scene.add(gltf.scene);
    //Tablet.material=Material_6;





   
   




});// End of GLTF loader








//Update mouse coordinates on mouse move
window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});
const MAX_TILT = THREE.MathUtils.degToRad(10);

//Raycaster for detecting clicks
function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

//Click functionality
const textureLoader = new THREE.TextureLoader();
function setScreenImage(path) {
  textureLoader.load(path, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    
    texture.flipY = false;   // required for GLTF

    // FIX MIRROR
    texture.repeat.set(-1, -1);
    texture.offset.set(1, 1);

   
    screenMaterial.map = texture;
    screenMaterial.needsUpdate = true;
  });
}





  // intersect ALL clickable objects
  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    const clicked = intersects[0].object;

    console.log('clicked object:', clicked.name +"  Camera posiion: "+camera.position.x + " , "+ camera.position.y + " , "+ camera.position.z );

    if(clicked.name === 'Button_0' || clicked.parent.name === 'Button_0'){
      if(Start_Button_pressed===true){
        
        console.log("Screen image set!");
        return;
      }
      
      
      StartButton.position.y -=0.5;
      Start_Button_pressed=true;
      screenMaterial.color.set(0xffffff);
      
      screen_01.material = screenMaterial;

      setScreenImage('./Welcome_2.png');

      
      
      }
    
    if(clicked.name === 'Button_1'){
      if(Pressed_Button===1 || Start_Button_pressed===false){
        console.log(Start_Button_pressed  );
        return;
      }
      setScreenImage('./Portfolio_1.png');
      Button_CV.rotation.x += Math.PI / 4;
      Button_Hakemus.quaternion.copy(Start_Position_Hakemus);
      Button_Info.quaternion.copy(Start_Position_Info);
      Pressed_Button=1;

    }
    if(clicked.name === 'Button_2'){
      if(Pressed_Button===2 || Start_Button_pressed===false){
        return;
      }
      setScreenImage('./About_me_2.png');
      Button_Hakemus.rotation.x += Math.PI / 4;
      Button_CV.quaternion.copy(Start_Position_CV);
      Button_Info.quaternion.copy(Start_Position_Info);
      Pressed_Button=2;


    }
    if(clicked.name === 'Button_3' ){
      if(Pressed_Button===3 || Start_Button_pressed===false){
        return;
      }
      setScreenImage('./Contact_3.png');
      Button_Info.rotation.x += Math.PI / 4;
      Button_CV.quaternion.copy(Start_Position_CV);
      Button_Hakemus.quaternion.copy(Start_Position_Hakemus);
      Pressed_Button=3;
      
    }

    // OPTIONAL: bubble up to parent if child has no name
    let parent = clicked.parent;
    while (parent && parent.name === '') {
      parent = parent.parent;
    }
    if (parent) console.log('parent:', parent.name);
  }


  


}
const raycaster = new THREE.Raycaster();
const mouse1 = new THREE.Vector2();

window.addEventListener('click', onClick, false);



















//Zoom control
const minY = 30;
const maxY = 100;

window.addEventListener('wheel', (event) => {
  // move camera along z
  camera.position.y += event.deltaY * 0.1; // adjust speed

  // clamp camera
  camera.position.y = Math.max(minY, Math.min(maxY, camera.position.y));
});
camera.lookAt(0,0,0);




//Wormhole effect
const tunnelGroup = new THREE.Group();
scene.add(tunnelGroup);

const path = new THREE.LineCurve3(
  new THREE.Vector3(0, -100, 0),
  new THREE.Vector3(0, 200, 0)
);
const geometry = new THREE.TubeGeometry(
  path,
  40,    // tubular segments
  45,      // radius
  20,     // radial segments (YOUR NEON LINES)
  false
);
const material = new THREE.MeshBasicMaterial({
  color: 0x01ffff,
  wireframe: true,
  transparent: true,
  opacity: 0.8,
  side: THREE.DoubleSide,

});
const tunnel = new THREE.Mesh(geometry, material);
//tunnel.position.y =-100 ;
tunnelGroup.add(tunnel);

const pos = geometry.attributes.position;
const original = pos.array.slice(); // store original

scene.add(new THREE.AmbientLight(0x00ffff, 0.3));







//Animation loop


function animate() {
  requestAnimationFrame(animate);

;
  
  const targetRotX = mouse.y * MAX_TILT;
  const targetRotZ = mouse.x * MAX_TILT;

  
  Tablet.rotation.x += (targetRotX - Tablet.rotation.x) * 0.1;
  Tablet.rotation.z += (targetRotZ - Tablet.rotation.z) * 0.1;

  if(Start_Button_pressed){
    Fan1.rotation.z += 0.1;
    Fan2.rotation.z += 0.1;
    Gear1.rotation.z += 0.05;
    Gear2.rotation.z -= 0.05;
    Gear3.rotation.z += 0.05;
    Gear4.rotation.z -= 0.05;
    Gear_Core.rotation.x += 0.1;
    StartButton.material=Material_4;
  }
  //StartButton.rotation.y += 0.01;
  //StartButton.position.y += 0.01;
  //Tablet.position.y += 0.01;
  //Tablet.rotation.y += 0.01;
  //console.log("fan position:::", Fan1.position);

  

  const time = performance.now() * 0.001;

  for (let i = 0; i < pos.count; i++) {
    const ix = i * 6;
    pos.array[ix]     = original[ix]     + Math.sin(time + ix) * 0.3;
    pos.array[ix + 1] = original[ix + 1];
    pos.array[ix + 2] = original[ix + 2] + Math.cos(time + ix) * 0.3;
  }

  pos.needsUpdate = true;

tunnel.position.y += 0.05; 
tunnel.rotation.y += 0.001;     // move toward camera
  if (tunnel.position.y > 10) { // reset
    tunnel.position.y = -50;
  }

 
  renderer.render(scene, camera);
}



animate();



