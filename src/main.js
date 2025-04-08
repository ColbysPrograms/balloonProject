import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import * as dat from 'dat.gui';
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer.render(scene, camera);

camera.position.set(50, 15, 5);

const controls = new OrbitControls(camera, renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

//const axesHelper = new THREE.AxesHelper(20);
//scene.add(axesHelper);

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

//const testSphereGeometry = new THREE.SphereGeometry(10);
//const testSphereMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: true });
//const testSphere = new THREE.Mesh(testSphereGeometry, testSphereMaterial);
//testSphere.position.set(0, 12, 0);
//scene.add(testSphere);

const ambientLight = new THREE.AmbientLight(0x999999);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xFFFFFF, 100);
pointLight.position.set(10, 15, 5);
scene.add(pointLight);

scene.background = new THREE.Color(0x1264AC);

var radius = sphere.scale.y * 5;

const gui = new dat.GUI();
var radiusChange = { radiusChange: 0 };
gui.add(radiusChange, "radiusChange", -0.01, 0.01, 0.001);

const drdtText = document.createElement('p');
drdtText.className = 'derivative';
drdtText.textContent = 'dr/dt = ' + radiusChange.radiusChange;
const dVdtText = document.createElement('p');
dVdtText.className = 'derivative';
dVdtText.textContent = 'dV/dt =';
const dVdrText = document.createElement('p');
dVdrText.className = 'derivative';
dVdrText.textContent = 'dV/dr = ';
const volumeText = document.createElement('p');
volumeText.className = 'derivative';
volumeText.textContent = 'Volume = ';
const scaleText = document.createElement('p');
scaleText.className = 'derivative';
scaleText.textContent = 'Scale = ';
const radiusText = document.createElement('p');
radiusText.className = 'derivative';
radiusText.textContent = 'Radius = ';

const pContainer = document.createElement('div');
pContainer.appendChild(scaleText);
pContainer.appendChild(radiusText);
pContainer.appendChild(volumeText);
pContainer.appendChild(drdtText);
pContainer.appendChild(dVdtText);
pContainer.appendChild(dVdrText);
const cPointLabel = new CSS2DObject(pContainer);
cPointLabel.position.set(20, 1, 20);
scene.add(cPointLabel);

var pi = 3.14159265;
var dVdr = 0;
var dVdt = 0;
var volume = 0;

const animate = function() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  if (sphere.scale.x >= 0.1) {
    sphere.scale.setScalar(sphere.scale.x + radiusChange.radiusChange);
    //sphere.scale.set(sphere.scale.x + radiusChange.radiusChange, sphere.scale.y + radiusChange.radiusChange, sphere.scale.z + radiusChange.radiusChange);
    sphere.position.set(sphere.position.x, sphere.position.y + 5 * radiusChange.radiusChange, sphere.position.z);
    //sphere.position.y.set(sphere.position.y + 5 * radiusChange.radiusChange);
  }
  else {
    sphere.scale.set(1, 1, 1);
    sphere.position.set(0, 12, 0);
  }
  radius = sphere.scale.x * 5;
  volume = 4 / 3 * pi * Math.pow(radius, 3);
  dVdt = 4 * pi * Math.pow(radius, 2) * radiusChange.radiusChange;
  dVdr = 4 * pi * Math.pow(radius, 2);
  scaleText.textContent = 'Scale = ' + sphere.scale.x.toPrecision(3);
  radiusText.textContent = 'Radius = ' + radius.toPrecision(3);
  drdtText.textContent = 'dr/dt = ' + (radiusChange.radiusChange * 5).toPrecision(2);
  volumeText.textContent = 'Volume = ' + volume.toPrecision(6);
  dVdtText.textContent = 'dV/dt = ' + dVdt.toPrecision(3);
  dVdrText.textContent = 'dV/dr = ' + dVdr.toPrecision(6);
};

//window.addEventListener('resize', function() {
//  camera.aspect = window.innerWidth / window.innerHeight;
//  camera.updateProjectionMatrix();
//  renderer.setSize(window.innerWidth / window.innerHeight);
//  labelRenderer.setSize(window.innerWidth / window.innerHeight);
//});

animate();
