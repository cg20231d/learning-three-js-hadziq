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
camera.position.set(0, 2, 10);

// Load the texture
const textureLoader = new THREE.TextureLoader();
const albedoTexture = textureLoader.load("albedo.jpg");
//const displacementTexture = textureLoader.load("displacement.jpg");
const normalsTexture = textureLoader.load("normals.jpg");
const roughnessTexture = textureLoader.load("roughness.jpg");

// Create the object geometry (vertex shader)
const objectGeometry = new THREE.SphereGeometry(2, 16, 32);

// Create the object material (fragment shader)
const objectMaterial = new THREE.MeshPhongMaterial({
    //color: 0xff00ff // This sets the color to red. You can change the hex value to any color you prefer.
    map: albedoTexture,
    //displacementMap: displacementTexture, // Displacement map
    normalMap: normalsTexture, // Normal map
    roughnessMap: roughnessTexture // Roughness map
});
//objectMaterial.displacementScale = 0.2; // Adjust the value as needed
objectMaterial.normalScale.set(0.5, 0.5); // Adjust the values as needed

// Create the object as a 3D object a.k.a. mesh
const object = new THREE.Mesh(objectGeometry, objectMaterial);
scene.add(object);

// Create a plane geometry
const planeGeometry = new THREE.PlaneGeometry(5, 5); // Adjust the size as needed

// Create a green material for the plane
const planeMaterial = new THREE.MeshPhongMaterial({
    //color: 0x00ff00, // Green color
    map: albedoTexture,
    //displacementMap: displacementTexture, // Displacement map
    normalMap: normalsTexture, // Normal map
    roughnessMap: roughnessTexture // Roughness map
});

// Create the plane as a 3D object (mesh)
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
plane.position.y = -2; // Adjust the position so it's below the object
scene.add(plane);

// Set up the ambient light
const ambientLight = new THREE.AmbientLight(0x202020);
scene.add(ambientLight);

// Set up the directional light
const directionalLight = new THREE.DirectionalLight(0xCCCCCC, 0.5); // Color and intensity
directionalLight.position.set(0, 1, 0); // Direction
scene.add(directionalLight);

// Set up the point light
const pointLight = new THREE.PointLight(0xFFFFFF, 1); // Color and intensity
pointLight.position.set(1.5, 1.5, 1.5); // Position
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
        object.position.x -= 0.1; // Adjust the position or speed as needed
    } else if (keyCode == 39) {  // Right Arrow
        object.position.x += 0.1;
    } else if (keyCode == 38) {  // Up Arrow
        object.position.y += 0.1;
    } else if (keyCode == 40) {  // Down Arrow
        object.position.y -= 0.1;
    }
}
document.addEventListener('keydown', onDocumentKeyDown, false);


// Render loop
function animate() {
    object.rotation.x += 0.01;
    object.rotation.y += 0.01;
    object.rotation.z += 0.01;
    camera.lookAt(object.position);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();