import * as THREE from 'three';
//import(OrbitControls) from 'three/examples/jsm/controls/OrbitControls.js';
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer.render(scene, camera);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(0, 2, 5);

const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 5);
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 0xFF6347 });
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

scene.add(cylinder)

const coneGeometry = new THREE.CylinderGeometry(1, 5, 5);
const cone = new THREE.Mesh(coneGeometry, cylinderMaterial);
cone.position.set(0, 0, 5)
scene.add(cone);

const ambientLight = new THREE.AmbientLight(0x404040)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 100)
pointLight.position.set(0, 0, 10)

scene.add(pointLight)

const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();

