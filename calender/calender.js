const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d'); 

let x = 0;
let y = 0;
var bgColor = "rgb(0,0,0)";
ctx.fillStyle = bgColor;
let imagePath = "10to12.png";

draw(canvas,imagePath);

canvas.addEventListener('click', onClick, false);

function onClick(e) {
    var rect = e.target.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    var str = document.getElementById("name").value;
    console.log(str);
    ctx.font = "20px serif";
    ctx.fillText(str,x,y);
    const a = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(a);
}

function draw(canvas,imagePath){
    const image = new Image();
    image.addEventListener("load",function (){
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);
    });
    image.src = imagePath;
}

function gorilla(){
    var adjective = ["エロ","眠たげな","お腹痛い","メガネ","本物の","変態","可愛い","絶倫","王子の"]
    var name = "🦍";
    document.getElementById("name").value = adjective[Math.floor(Math.random() * adjective.length)]+name;
}

/*
function download(){
    var peint = document.getElementById("canvas");
    var data = peint.toDataURL("image/jpeg");
    document.getElementById("download").href = base64;
}
*/

$("#download").click(function(){
    cvs = document.getElementById('canvas');
    var base64 = cvs.toDataURL("image/jpeg");
    document.getElementById("download").href = base64;
  });