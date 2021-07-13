const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d'); 
let x = 0;
let y = 0;

let imagePath = "8.png";
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

