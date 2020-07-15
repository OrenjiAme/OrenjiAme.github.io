//初期設定
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90,1000/500,0.1,10000);
var renderer = new THREE.WebGLRenderer();
var light = new THREE.AmbientLight(0xffffff);
var moonlight = new THREE.PointLight(0xffffff);
renderer.setSize(1000,500);
camera.position.set(0,0,2000);
scene.add(light);
document.body.appendChild(renderer.domElement);

//モデル作成
var URL='https://www.gakujutsu.co.jp/text/isbn978-4-7806-0708-6/file/';
var loader = new THREE.TextureLoader();
var texture2 = loader.load(URL+'earth.jpg');
var texture3 = loader.load(URL+'sun.jpg');
var texture4 = loader.load(URL+'moon.jpg');

function planet(texture,r){
    var p = new THREE.SphereGeometry(r);
    var q = new THREE.MeshStandardMaterial({map:texture});
    var sphere = new THREE.Mesh(p,q);
    return sphere;
}
var earth = planet(texture2,100);
var sun = planet(texture3,500);
var moon = planet(texture4,30);
//初期位置設定
sun.position.set(100,100,100);
sun.add(earth);
earth.position.set(0,0,1000);
moon.position.set(0,0,150);
moon.add(moonlight);
earth.add(moon);
scene.add(sun);

//天井
var g_geometry = new THREE.SphereGeometry(12);
for ( var x = -20 ; x<30 ; x++ ) {
    //var col = "0x" + String(random_integer(100,255).toString(16)) + String(random_integer(0,255).toString(16)) + String(random_integer(0,255).toString(16));
    for ( var y = -20 ; y<30 ; y++ ) {
    var g_material = new THREE.MeshStandardMaterial({color:0xffffff});
    var u=x*2+random_integer(-50,50);
    var v=y+random_integer(-50,50);
    if (y & 1) {u+=1};
    var ground = new THREE.Mesh( g_geometry, g_material );
    ground.position.set(u*500, -2000, v*500);
    scene.add( ground );
    var ground = new THREE.Mesh( g_geometry, g_material );
    ground.position.set(u*500, 2000, v*500);
    scene.add( ground );
}
}

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
var r1 = 1000;//回転半径
var r2 = 150;
var random = Math.random()*3
function draw(){
    cnt++;
    var rot = mouseX * 2 * Math.PI;
    var h = mouseY * 2000 - 1000;
    camera.position.set(Math.sin(rot)*2000, h, Math.cos(rot)*2000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    var rot1 = rotation(cnt,r1,1);
    var rot2 = rotation(cnt,r2,10);
    sun.position.set(rot1[0],0,rot1[1]);
    earth.position.set(rot1[0],0,rot1[1]);
    moon.position.set(rot2[0],0,rot2[1]);
    requestAnimationFrame(draw);
    renderer.render(scene,camera);
}

function rotation(cnt,r,c){
    var rad = c*cnt*Math.PI/180;
    var x = r*Math.sin(rad);
    var y = r*Math.cos(rad);
    return [x,y];
}

function change_camera(x,y,z){
    camera.position.set(x,y,z);
}

function random_integer(first,end){
    end -= first;
    return Math.round(Math.random()*end)+first;
}

//イベント駆動処理
var mouseX = 0;
var mouseY = 0;

document.addEventListener("mousemove",(event) => {
    mouseX = event.pageX/window.innerWidth;
    mouseY = event.pageY/window.innerHeight;
});

draw();