// Create a scene
const scene = new THREE.Scene();

// Create a WebGL Renderer and add it to the DOM
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.025,
    1000
);
camera.position.set(0, 2, 5);

// Create the cube geometry (vertex shader)
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);

// Create the cube material (fragment shader)
const cubeMaterial = new THREE.MeshPhongMaterial({
    color: 0xff00ff // This sets the color to red. You can change the hex value to any color you prefer.
});

// Create the cube as a 3D object a.k.a. mesh
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Set up the ambient light
const ambientLight = new THREE.AmbientLight(0x202020);
scene.add(ambientLight);

// Set up the directional light
const directionalLight = new THREE.DirectionalLight(0xCCCCCC, 0.5); // Color and intensity
directionalLight.position.set(0, 1, 0); // Direction
scene.add(directionalLight);

// Set up the point light
const pointLight = new THREE.PointLight(0xFFFFFF, 1); // Color and intensity
pointLight.position.set(1, 2, 3); // Position
scene.add(pointLight);

// Handle resize events
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Interactive graphics
function onDocumentKeyDown(event) {
    var keyCode = event.which;

    if (keyCode == 37) {         // Left Arrow
        cube.position.x -= 0.1; // Adjust the position or speed as needed
    } else if (keyCode == 39) {  // Right Arrow
        cube.position.x += 0.1;
    } else if (keyCode == 38) {  // Up Arrow
        cube.position.y += 0.1;
    } else if (keyCode == 40) {  // Down Arrow
        cube.position.y -= 0.1;
    }
}
document.addEventListener('keydown', onDocumentKeyDown, false);


// Render loop
function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    camera.lookAt(cube.position);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();