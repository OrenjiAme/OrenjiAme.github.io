//課題Aグローバル変数
var cvs = document.getElementById("hcnv");
var ctx = cvs.getContext("2d");
//課題Bグローバル変数
var mouseX=0, mouseY=0, mouseB=0, p_mouseX, p_mouseY,p_mouseB = 0;
var fx;var fy;var ex;var ey;
var myImageData;

function mainA(){
    reset();
    var q1 = get_item(["hikone","naha","aba"]);
    var q2 = get_item(["sun","rain","temp","snow"]);
    var colors = ["rgb(255,0,0)","rgb(0,255,0)","rgb(0,0,255)"]
    var data = getCSV();
    var data = convdata(data);
    title();
    for(var i = 0;i < q1.length;i++){
        if(q1[i]){
            for(var j = 0;j < q2.length;j++){
                if(q2[j]){
                    drawA(data[i],j,colors[i]);
                }
            }
        }
    }
}

function drawA(data,j,rgb) {
    ctx.beginPath();
    ctx.strokeStyle = rgb;
    const k = 5;
    for(var i = 1;i < data.length;i++){
        ctx.moveTo(2.5*i-1,k*Number(data[i-1][j])+250);
        ctx.lineTo(2.5*i,k*Number(data[i][j])+250);
    }
    ctx.stroke();
}

function title(){
    ctx.font = "12pt serif";
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeText("彦根",50,20);
    ctx.strokeText("那覇",50,40);
    ctx.strokeText("網走",50,60);
    ctx.strokeStyle = "red";
    line(10,13,40,13,"rgb(255,0,0)");
    ctx.strokeStyle = "rgb(0,255,0)";
    line(10,33,40,33,"rgb(0,255,0)");
    ctx.strokeStyle = "rgb(0,0,255)";
    line(10,53,40,53,"rgb(0,0,255)");
}

function random_draw(){
    var a = Math.floor(Math.random() * 1024);
    var b = Math.floor(Math.random() * 500);
    var c = Math.floor(Math.random() * 1024);
    var d = Math.floor(Math.random() * 500);
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    var str = "RGB(" + r +"," + g + "," + b + ")";
    console.log(str);
    line(a,b,c,d,str);
}

function mouseMove(){
    var pen = document.getElementById("color").value;
    var dt = get_item(["free","liner","rect"])//drawtype
    var rect = cvs.getBoundingClientRect();
    p_mouseX = mouseX;
    p_mouseY = mouseY;
    mouseX = event.pageX - rect.left;
    mouseY = event.pageY - rect.top;
    var type = document.getElementById("AorB").value;
    if(type == "課題A")return;
    if(mouseB == 1 && dt[0]){
        line(p_mouseX,p_mouseY,mouseX,mouseY,pen);
    }
    if(dt[1] || dt[2]){
        /*
        myImageData = ctx.getImageData(0,0,cvs.width,cvs.height);
        ctx.putImageData(myImageData,0,0);
        console.log(myImageData);
        */
        if(p_mouseB == 0 && mouseB == 1){
            fx = mouseX;
            fy = mouseY;
            p_mouseB = mouseB;
            console.log(fx,fy);
        }
        if(mouseB == 0 && p_mouseB == 1){
            ex = mouseX;
            ey = mouseY;
            p_mouseB = 0;
            if(dt[1])line(fx,fy,ex,ey,pen);
            if(dt[2])ctx.strokeRect(fx,fy,ex-fx,ey-fy);
        }
    }
}

function line(x1,y1,x2,y2,rgb){
    ctx.beginPath();
    ctx.strokeStyle = rgb;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}

function change(){
    reset();
    var a = document.getElementById("AorB");
    if(a.value == "課題A"){
        a.value = "課題B";
        document.getElementById("A").style.display = "none";
        document.getElementById("B").style.display = "block";
    }
    else{
        a.value = "課題A";
        document.getElementById("B").style.display = "none";
        document.getElementById("A").style.display = "block";
    }
}

function getCSV(){
    var url = "https://www.gakujutsu.co.jp/text/isbn978-4-7806-0708-6/file/oneyear.csv";
    var req = new XMLHttpRequest();
    req.open("get",url,false);
    req.send();
    var tmp = req.responseText.split("\n");
    var result = [];
    for(var i = 0;i < tmp.length;i++){
        result[i] = tmp[i].split(",");
    }
    return result;
}

function convdata(data){
    var day = [];
    var hikone = [];
    var naha = [];
    var aba = [];
    for(var i = 2;i < data.length;i++){
        var a =[];var b = [];var c = [];
        for(var j = 0;j < data[i].length;j++){
            if(j == 0)day.push(data[i][j]);
            else if(j <= 4)a.push(data[i][j]);
            else if(j <= 8)b.push(data[i][j]);
            else c.push(data[i][j]);
        }
        hikone.push(a);naha.push(b);aba.push(c);
    }
    return [hikone,naha,aba];
}

function get_item(name){
    res = [];
    for(var i = 0;i < name.length;i++){
        if(document.getElementById(name[i]).checked){
            res[i] = true;
        }
        else res[i] = false;
    }
    return res;
}
function reset(){
    ctx.clearRect(0, 0, cvs.width, cvs.height);
}