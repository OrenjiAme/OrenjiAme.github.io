//初期設定
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70,1000/500,0.1,10000);
var renderer = new THREE.WebGLRenderer();
var light = new THREE.AmbientLight(0xffffff,2.0);
renderer.setSize(1000,500);
camera.position.set(0,0,1000);
scene.add(light);
document.body.appendChild(renderer.domElement);

//テクスチャ読み込み
var URL='https://www.gakujutsu.co.jp/text/isbn978-4-7806-0708-6/file/';
var texture = [];
var loader = new THREE.TextureLoader();
var kamon_image = loader.load("66601.jpg");
var sign_texture = loader.load(URL + "a1.jpg");
texture.push( loader.load(URL+ '1.jpg') ); // texture[0]
texture.push( loader.load(URL+ '2.jpg') ); // texture[1]
texture.push( loader.load(URL+ '3.jpg') ); // texture[2]
texture.push( loader.load(URL+ '4.jpg') ); // texture[3]

//球体作成メソッド
function planet(texture,r){
    var p = new THREE.SphereGeometry(r,40);
    var q = new THREE.MeshStandardMaterial({map:texture,side:THREE.DoubleSide});//裏面も描画
    var sphere = new THREE.Mesh(p,q);
    return sphere;
}

//看板作成メソッド
var sign = (a,b,c,texture) => {
    var geometry = new THREE.BoxGeometry(7, 3, 0.01);
    var material = new THREE.MeshStandardMaterial( { map: texture } );
    var anotation = new THREE.Mesh( geometry, material );
    anotation.position.set(a*20,b*20,c*20);
    anotation.lookAt(new THREE.Vector3(0,0,0,));
    current.add(anotation);
    //scene.add(anotation);
}

var p1 = planet(texture[0],50);
var p2 = planet(texture[1],50);
var p3 = planet(texture[2],50);
var p4 = planet(texture[3],50);
var current = p1;

p1.position.set(0,0,0);
p2.position.set(-500,0,0);
p3.position.set(-1000,0,1000);
p4.position.set(-1000,0,2500);

p3.rotation.y = 90*Math.PI/180;
p4.rotation.y = 90*Math.PI/180;

scene.add(p1);
scene.add(p2);
scene.add(p3);
scene.add(p4);

current.scale.set(100,100,100);

//マウスイベント
var mouseX = 0, mouseY = 0, mouseB = false;

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    });
    document.addEventListener("mousedown", (event) => {
    mouseB = true;
    });
    document.addEventListener("mouseup", (event) => {
    mouseB = false;
})

var p_mouseX = 500, p_mouseY = 250, p_mouseB = 0;
var rot = 0, h = 0;

//視点移動 pov = Point Of View
function move_POV(px,py,x,y){
    rot -= (px - x) * 0.005; 
    h -= (py - y) * 0.005;
    if(h >= Math.PI/2)h = Math.PI/2;
    if(h <= -Math.PI/2)h = -Math.PI/2;
    camera.lookAt(new THREE.Vector3(Math.sin(rot) * 10000, Math.sin(h) * 10000, Math.cos(rot) * 10000));
}

//マウスカーソルの座標を正規化画像座標へ変換
var u = 0,v = 0;
document.addEventListener("mousemove", (event) => {
    var rect = event.target.getBoundingClientRect();
    u = (event.clientX - rect.left) * 2 / (rect.right - rect.left) - 1;
    v = (event.clientY - rect.top) * 2 / (rect.top - rect.bottom) + 1;
    mouseX = event.clientX;
    mouseY = event.clientY;
});

//物体検出関数　クリックした場所に物体があるかどうか
var target_list = [p1,p2,p3,p4];
function detectObject(target_list, exception, u, v ) {
    var vector = new THREE.Vector3( u, v ,1);
    vector.unproject(camera);
    var ray = new THREE.Raycaster( camera.position,vector.sub( camera.position ).normalize() );
    var obj_list = ray.intersectObjects( target_list);
    for (var j=0 ; j<obj_list.length ; j++){
        if (obj_list[j].object != exception){
            return obj_list[j].object;
        }   
    }
    return null;
}

function make_image(txt){
    canvas = document.getElementById('canvas1');
    var ctx = canvas.getContext('2d');
    /* Imageオブジェクトを生成 */
    var img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.textAlign="center";
        ctx.fillStyle = "black";
        ctx.font = "60px 'ＭＳ ゴシック'";
        ctx.fillText(txt, canvas.width/2, canvas.height/2);
    };
    img.src = "5156.png";
    return canvas.toDataURL();
}

function xy2vec3(x,y){//x,yを緯度経度へ変換し球体の3次元ベクトルへ
    var theta = 360 * x/1920;
    var phi = 90 - 180*y/960;
    return [-Math.cos(theta)*Math.cos(phi),Math.sin(phi),Math.sin(theta)*Math.cos(phi)];
}
//描画
function draw(){
    requestAnimationFrame(draw);
    renderer.render(scene,camera);
    if(mouseB)move_POV(p_mouseX, p_mouseY, mouseX, mouseY);
    if(mouseB && !p_mouseB){
        var next = detectObject(target_list,current,u,v);
        if(next != null){
            next.scale.set(100,100,100);
            current.scale.set(1,1,1);
            camera.position.set(next.position.x,next.position.y,next.position.z);
            current = next;
        }
    }
    p_mouseB = mouseB;
    p_mouseX = mouseX;
    p_mouseY = mouseY;
}

function p(a){console.log(a);}

function kamon(){
    var x = random_integer(1, 1920);
    var y = random_integer(1, 960);
    var tgt = xy2vec3(x,y);
    sign(tgt[0], trgt[1], tgt[2], kamon_image);
}

//ランダムな整数
function random_integer(first,end){
    end -= first;
    return Math.round(Math.random()*end)+first;
}

draw();