const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d'); 

let x = 0;
let y = 0;
var bgColor = "rgb(0,0,0)";
ctx.fillStyle = bgColor;
let imagePath = "10to12.png";
var hist = [];
var cnt = 0;

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

$("#download").click(function(){
    cvs = document.getElementById('canvas');
    var base64 = cvs.toDataURL("image/jpeg");
    document.getElementById("download").href = base64;
  });

// スタックしておく最大回数。キャンバスの大きさの都合などに合わせて調整したら良いです。
const STACK_MAX_SIZE = 5;
// スタックデータ保存用の配列
let undoDataStack = [];
let redoDataStack = [];

// canvasへの描画処理を行う前に行う処理
function beforeDraw() {
    // やり直し用スタックの中身を削除
    redoDataStack = [];
    // 元に戻す用の配列が最大保持数より大きくなっているかどうか
    if (undoDataStack.length >= STACK_MAX_SIZE) {
        // 条件に該当する場合末尾の要素を削除
        undoDataStack.pop();
    }
    // 元に戻す配列の先頭にcontextのImageDataを保持する
    undoDataStack.unshift(ctx.getImageData(0, 0, $canvas[0].width(), $canvas[0].height()));
}

function undo () {
     // 戻す配列にスタックしているデータがなければ処理を終了する
    if (undoDataStack.length <= 0) return;
    // やり直し用の配列に元に戻す操作をする前のCanvasの状態をスタックしておく
    redoDataStack.unshift(ctx.getImageData(0, 0, $canvas[0].width(), $canvas[0].height()));
    // 元に戻す配列の先頭からイメージデータを取得して
    var imageData = undoDataStack.shift();
    // 描画する
    ctx.putImageData(imageData, 0, 0);
}

function redo () {
    // やり直し用配列にスタックしているデータがなければ処理を終了する
    if (redoDataStack.length <= 0) return;
    // 元に戻す用の配列にやり直し操作をする前のCanvasの状態をスタックしておく
    undoDataStack.unshift(ctx.getImageData(0, 0, $canvas[0].width(), $canvas[0].height()));
    // やり直す配列の先頭からイメージデータを取得して
    var imageData = redoDataStack.shift();
    // 描画する
    ctx.putImageData(imageData, 0, 0);
}
