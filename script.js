import * as THREE from 'three';

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera( 70, width / height);
camera.position.z = 1;

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();


const boxShape = new THREE.BoxGeometry( 0.3, 0.12, 0.21 );
const MBM = new THREE.MeshBasicMaterial();


const box01 = new THREE.Mesh( boxShape, MBM.clone());
const box02 = new THREE.Mesh( boxShape, MBM.clone());
box02.position.x = 0.25;
box02.position.y = -0.25
scene.add( box01, box02 );


const colourArr = ["green", "purple", "yellow", "red", "blue", "pink"];
let currentColour = 0;
function nextColour(){
        if(currentColour >= colourArr.length) currentColour = 0; 
        return colourArr[currentColour++];
}


let clicked = false;
function onPointerMove( event ) {
	pointer.x = ( 2 / window.innerWidth ) * event.clientX - 1;
	pointer.y = - (2 / window.innerHeight) * event.clientY + 1;
}


function animate( time ) {

    if(clicked){
        raycaster.setFromCamera( pointer, camera );
        const intersects = raycaster.intersectObjects( scene.children );
    
        if( intersects[0] && clicked){
            intersects[0].object.material.color.set(nextColour());
        }
        clicked = false;
    }

        
    box01.rotation.x = time / 6300;
	box01.rotation.y = time / 3300;
	box02.rotation.x = time / 3300;
    box02.rotation.y = time / 6300;
	renderer.render( scene, camera );

}

window.addEventListener( 'pointermove', onPointerMove );
window.addEventListener("click", x => {clicked = true;});