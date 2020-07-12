var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70,1000/500,0.1,3000);
var renderer = new THREE.WebGLRenderer();
var light = new THREE.DirectionalLight(0xffffff);
var light3 = new THREE.DirectionalLight(0xffffff);
var geometry = new THREE.BoxGeometry(200,200,200);
var material1 = new THREE.MeshStandardMaterial({color:0xff0000})
var material2 = new THREE.MeshStandardMaterial({color:0x00ff00})
var material3 = new THREE.MeshStandardMaterial({color:0x0000ff})
var material = new THREE.MeshStandardMaterial({color:0xffffff})
var cube = new THREE.Mesh(geometry,material3);
var sphere_geometry = new THREE.SphereGeometry(100, 32, 32);
var geom = new THREE.Mesh(sphere_geometry,material2);
var regular_tetrahedron = new THREE.TetrahedronGeometry(200);
var angle = new THREE.Mesh(regular_tetrahedron,material1);
var torus = new THREE.TorusGeometry(100,20,6,32);
var doughnut = new THREE.Mesh(torus,material);

renderer.setSize(1000,500);
light.position.set(500,500,500);
light3.position.set(-500,-500,-500);
camera.position.set(0,0,2000);
scene.add(cube);
scene.add(light);
scene.add(light3);
scene.add(geom);
scene.add(angle);
scene.add(doughnut);
geom.position.x = 500;
document.body.appendChild(renderer.domElement);

//xy軸表示
var grid = new THREE.GridHelper(0,0);
grid.material.color = new THREE.Color(0xaaaaaa);
scene.add(grid);
var add_line = (obj, end_pos, color) => {
    var start_pos = new THREE.Vector3(0, 0, 0);
    var g = new THREE.Geometry();
      g.vertices.push(start_pos);
      g.vertices.push(end_pos);
      var material = new THREE.LineBasicMaterial({linewidth: 4, color: color});
      var line = new THREE.Line(g, material);
      obj.add(line);
}
add_line(grid, new THREE.Vector3( 10000, 0, 0 ), "#ff0000");
add_line(grid, new THREE.Vector3( 0, 10000, 0 ), "#00ff00");
add_line(grid, new THREE.Vector3( 0,0,10000), "#0000ff");

var cnt = 0;
var r = 500;//回転半径
var random = Math.random()*3
function draw(){
    requestAnimationFrame(draw);
    cnt++;
    if(cnt == 360)cnt = 0;
    var rad = cnt*Math.PI/180;
    var x1 = r*Math.cos(rad);
    var y1 = r*Math.sin(rad);
    var x2 = r*Math.cos(random*rad);
    var y2 = r*Math.sin(random*rad);
    var x3 = r*Math.cos(2*rad);
    var y3 = r*Math.sin(2*rad);
    cube.position.set(x1,y1,0);
    geom.position.set(-x2,0,y2);
    angle.position.set(0,x3,-y3);
    if(cnt % 10 == 0)doughnut.position.set(random_integer(-500,500),random_integer(-500,500),random_integer(-500,500));
    cube.rotation.z += 0.05;
    geom.rotation.y += 0.05;
    angle.rotation.x += 0.05;
    doughnut.rotation.x += 0.03;
    doughnut.rotation.y += 0.03;
    doughnut.rotation.z += 0.03;
    renderer.render(scene,camera);
}
draw();

function change_camera(n){
    if(n == 1)camera.position.set(2000,0,0);
    if(n == 2)camera.position.set(0,2000,0);
    if(n == 3)camera.position.set(0,0,2000);
    if(n == 4)camera.position.set(1000,1000,1000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function random_integer(first,end){
    end -= first;
    return Math.round(Math.random()*end)+first;
}