function reset(){document.location.reload();}

function calc(){//ボタンを押したとき
    var q1 = get_item(["hikone","naha","aba"]);
    var q2 = get_item(["sun","rain","temp","snow"]);
    var frist = Number(document.getElementById("first").value);
    var end = Number(document.getElementById("end").value);
    var data = getCSV();
    data = convdata(data);
    var hikone_ave = average(data[1],data[0],frist,end);
    var naha_ave = average(data[2],data[0],frist,end);
    var aba_ave = average(data[3],data[0],frist,end);
    console.log(hikone_ave);
    print([hikone_ave,naha_ave,aba_ave],q1,q2);
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

function getCSV(){
    var url = "https://www.gakujutsu.co.jp/text/isbn978-4-7806-0708-6/file/oneyear.csv";
    var req = new XMLHttpRequest();
    req.open("get",url,false);
    req.send();
    var tmp = req.responseText.split("\n");
    var result = [];
    for(var i = 0;i < tmp.length;i++){
        result[i] = tmp[i].split();
    }
    return result;
}

function convdata(data){
    var day = [];
    var hikone = [];
    var naha = [];
    var aba = [];
    for(var i = 2;i < data.length;i++){
        var d = data[i][0].split(",");
        var a =[];var b = [];var c = [];
        for(var j = 0;j < d.length;j++){
            if(j == 0)day.push(d[j]);
            else if(j <= 4)a.push(d[j]);
            else if(j <= 8)b.push(d[j]);
            else c.push(d[j]);
        }
        hikone.push(a);naha.push(b);aba.push(c);
    }
    return [day,hikone,naha,aba];
}

function average(list,day,f,e){//リスト、最初、最後 //彦根、那覇、網走の順
    var sum = [0,0,0,0];
    var cnt = 0;
    for(var i = 0;i < day.length;i++){
        var month = Number(day[i].split("/")[1]);
        if(f <= month && month <= e || f >= month && month >= e){
            sum[0] += Number(list[i][0]);
            sum[1] += Number(list[i][1]);
            sum[2] += Number(list[i][2]);
            sum[3] += Number(list[i][3]);
        }
        cnt++;
    }
    for(var i = 0;i < sum.length;i++){
        sum[i] /= cnt;
        sum[i] = sum[i].toFixed(2);
    }
    return sum;
}

function print(h,q1,q2){
    console.log(h);
    var output = "";
    var city = ["彦根市","那覇市","網走市"]
    var items = ["日照時間","降水量","気温","積雪量"];
    var unit = ["(時間)","(mm)","(℃)","(cm)"];
    for(var i = 0;i < q1.length;i++){
        if(q1[i] == true){
            output += "[" + city[i] + "]" + "\n";
            for(var j = 0;j < q2.length;j++){
                if(q2[j] == true){
                    output += items[j] + String(h[i][j]) + unit[j] + "\n";
                }
            }
            output += "\n";
        }
    }
    document.getElementById("result").innerHTML = output;
}

function DL(){
    var answer = confirm("結果をダウンロードしますか？");
    if(answer == true){
        downloadText();
    }
}

function downloadText(){
    name = "result.txt";
    content = document.getElementById("result").innerHTML;
    var blob = new Blob([content],{"type":"text/plain"});
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.target = "_blank";
    a.download = name;
    a.click();
}

function season(n){
    if(n == 1){
        document.getElementById("first").value = "3";
        document.getElementById("end").value = "5";
    }
    if(n == 2){
        document.getElementById("first").value = "6";
        document.getElementById("end").value = "8";
    }
    if(n == 3){
        document.getElementById("first").value = "9";
        document.getElementById("end").value = "11";
    }
    if(n == 4){
        document.getElementById("first").value = "12";
        document.getElementById("end").value = "2";
    }
}