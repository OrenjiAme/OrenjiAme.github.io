var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70,1000/500,0.1,1000);
var renderer = new THREE.WebGLRenderer();
var light = new THREE.DirectionalLight(0xffa500);
var light2 = new THREE.PointLight(0x00ff00,2,3000,1.0);
var geometry = new THREE.BoxGeometry(100,100,100);
var material = new THREE.MeshStandardMaterial({color:0xffffff})
var cube = new THREE.Mesh(geometry,material);
renderer.setSize(1000,500);
light.position.set(1,1,1);
light2.position.set(1,-2000,1);
camera.position.set(0,0,1000);
scene.add(cube);
scene.add(light2);
scene.add(light);
document.body.appendChild(renderer.domElement);

function draw(){
    requestAnimationFrame(draw);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene,camera);
}
draw();