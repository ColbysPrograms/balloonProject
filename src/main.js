import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import * as dat from 'dat.gui';
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer.render(scene, camera);

camera.position.set(50, 15, 5);

const controls = new OrbitControls(camera, renderer.domElement);

const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 5);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
scene.add(cylinder)

const coneGeometry = new THREE.CylinderGeometry(0.2, 5, 5);
const cone = new THREE.Mesh(coneGeometry, cylinderMaterial);
cone.position.set(0, 5, 0)
scene.add(cone);

const sphereGeometry = new THREE.SphereGeometry(5);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000FF });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(0, 12, 0);
scene.add(sphere);

const cubeGeometry = new THREE.BoxGeometry(100, 5, 100);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x4fe514 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(0, -5, 0);
scene.add(cube);

const ambientLight = new THREE.AmbientLight(0x999999);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF, 100);
pointLight.position.set(10, 15, 5);
scene.add(pointLight);

scene.background = new THREE.Color(0x1264AC);

//const slider = document.createElement('input');
//slider.type = 'range';
//slider.min = '-50';
//slider.max = '50';
//slider.value = '0';
//slider.className = 'slider'
//slider.id = 'myRange'
//const sliderContainer = document.createElement('div');
//sliderContainer.appendChild(slider);
//const cPointLabel = new CSS2DObject(sliderContainer);
//scene.add(sliderContainer);

//var radiusChange = slider.value;
//slider.oninput = function() {
//  radiusChange = this.value;
//}
const gui = new dat.GUI();
var radiusChange = { radius: 0 };
//gui.add(sphere.position, "x", -50, 50, 1);
gui.add(radiusChange, "radius", -0.01, 0.01, 0.001);
const animate = function() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  //labelRenderer.render(scene, camera);
  //sphere.scale += valueOf(radiusChange.radius);
  if (sphere.scale.x >= 0) {
    sphere.scale.set(sphere.scale.x + radiusChange.radius, sphere.scale.y + radiusChange.radius, sphere.scale.z + radiusChange.radius);
  }
};

animate();

