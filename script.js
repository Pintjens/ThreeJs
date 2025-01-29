import * as THREE from 'three';

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera( 70, width / height);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.3, 0.12, 0.21 );
const material = new THREE.MeshBasicMaterial();


const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );


let origin = new THREE.Vector3(0,0,3);
let direction = new THREE.Vector3(0,0,0);
const raycaster = new THREE.Raycaster(origin.normalize(), direction.normalize());
const pointer = new THREE.Vector2();


const colourArr = ["green", "purple", "yellow", "red", "blue", "pink"];
let currentColour = 0;
function changeColour(colour = undefined){
    if(!colour){
        colour = colourArr[currentColour++];
        if(currentColour >= colourArr.length) currentColour = 0; 
    }

    material.color.set(colour);
}

function onPointerMove( event ) {
	pointer.x = ( 2 / window.innerWidth ) * event.clientX - 1;
	pointer.y = - (2 / window.innerHeight) * event.clientY + 1;
}

let clicked = false;

// animation
function animate( time ) {

    if(clicked){
        raycaster.setFromCamera( pointer, camera );
        const intersects = raycaster.intersectObjects( scene.children );
    
        if( intersects[0] && clicked){
            changeColour();
        }
        clicked = false;
    }

        
    mesh.rotation.x = time / 6300;
	mesh.rotation.y = time / 3300;

	renderer.render( scene, camera );

}

window.addEventListener( 'pointermove', onPointerMove );
window.addEventListener("click", x => {clicked = true;});