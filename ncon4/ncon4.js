//使うグローバル変数
var turn = 0;//ターン数
var game_table = Array.from(new Array(7), () => new Array(7).fill(0));//盤面　テーブルの要素をリスト[i][j]に格納した。
var location_i;//コマを置いた位置iを記録しておく。探索用
var location_j;//コマを置いた位置jを記録しておく。探索用
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore(app);

//新しいドキュメントの更新を監視
db.collection("game").orderBy("createdAt", "desc").limit(1).onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function(doc){
        var data = doc.data();
        turn = data.turn_count;
        game_table = JSON.parse(data.table);
        //game_table = data.table;
    });
    write_table();
    console.log(turn);
});

function reset(){
    game_table = Array.from(new Array(7), () => new Array(7).fill(0));
    db.collection("game").add({
        turn_count:0,
        table:JSON.stringify(game_table),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    //document.location.reload();//ページ更新
}

function write_table(){//配列 game_tableをhtmlに書き込む
    table = document.getElementById("game");
    var str = "";
    for(var i = 0; i <= 6; i++){
        str += '<th><input type="button" value="置く！" onclick="play(' + String(i) + ')"></th>';
    }
    for(var i = 1; i < 7; i++){
        str += "<tr>";                
        for(var j = 0; j < 7; j++){
            if(game_table[i][j] == 1){str += '<td><span class = "o">' + "●" + '</span></td>';}
            else if(game_table[i][j] == 2){str += '<td><span class = "x">' + "▲" + '</span></td>';}
            else str += '<td><span class = "space"></span></td>';
        }
        str += "</tr>";
    }
    //console.log(str);
    table.innerHTML = str;
}

function write_db(){
    db.collection("game").add({
        turn_count:turn,
        table:JSON.stringify(game_table),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function play(n){//ボタンを押したとき、コマを配置する。nは行0~6
    if(document.getElementById("win").innerHTML != " "){return;}
    var tgt;
    if(turn % 2 == 0)tgt = 1;
    else tgt = 2;
    if(set(n)){
        write_table();
        if(check(location_i,location_j,tgt))clear();
        else{turn++;change_turn();}
        write_db();
    }
    else alert("そこには置けません。");
}

function set(n){//n行目のコマがないところにコマを設置 0indexed
    for(var i = 6; i >= 1; i--){
        if(game_table[i][n] == 0){
            if(turn % 2 == 0){
                game_table[i][n] = 1;
            }
            else game_table[i][n] = 2;
            location_i = i;
            location_j = n;
            //console.log(location_i,location_j);
            return true;
        }
    }
    return false;
}

function change_turn(){//oとxが交代するごとに〇〇のターンです。を更新する。
    if(turn % 2 == 0){
        document.getElementById("turnA").style.display = "block";
        document.getElementById("turnB").style.display = "none";
    }
    else{
        document.getElementById("turnB").style.display = "block";
        document.getElementById("turnA").style.display = "none";
    }
}

function check(a,b,tgt){//今置いた位置game_tabel[a][b]から盤面にコマが４つ連続で揃っているかどうかチェックする。
    var cnt = 0;
    //横方向
    for(var i = 0; i <=  6; i++){
        if(game_table[a][i] == tgt)cnt++;
        else{
            cnt = 0;
            continue;
        }
        if(cnt >= 4)return true;
    }
    //縦方向
    cnt = 0;
    for(var i = 1;i <= 6; i++){
        if(game_table[i][b] == tgt)cnt++;
        else{
            cnt = 0;
            continue;
        }
        if(cnt >= 4)return true;
    }
    //斜め方向 pf(始点) から pe(終点)まで増えているもの y = x方向
    dia_pf = [[1,0],[2,0],[1,1],[1,2],[3,0],[1,3]];
    dia_pe = [[6,5],[6,4],[6,6],[5,6],[6,3],[4,6]];
    for(var num = 0; num < dia_pf.length; num++){
        var i = dia_pf[num][0];
        var j = dia_pf[num][1];
        //console.log(dia_pe[num]);
        cnt = 0;//初期化
        for(var c = dia_pf[num][0];c <= dia_pe[num][0]; c++){
            if(game_table[i][j] == tgt)cnt++;
            else cnt = 0;
            if(cnt >= 4){return true;}
            //console.log(i,j);
            i++;j++;
        }
    }
    //斜め方向 mf(始点) から m e(終点)までy = -x方向　i++ j--
    dia_mf = [[1,5],[1,6],[2,6],[1,4],[1,3],[3,6]];
    dia_me = [[6,0],[6,1],[6,2],[5,0],[4,0],[6,3]];
    for(var num = 0; num < dia_pf.length; num++){
        var i = dia_mf[num][0];
        var j = dia_mf[num][1];
        //console.log(dia_mf[num]);
        cnt = 0;//ループの中に初期化書いてなかった...！
        for(var c = dia_mf[num][0];c <= dia_me[num][0]; c++){
            if(game_table[i][j] == tgt)cnt++;
            else cnt = 0;
            if(cnt >= 4){return true;}
            //console.log(i,j);
            i++;j--;
        }
    }
    return false;
}

function clear(){
    if(turn % 2 == 0){
        alert("先手●の勝ちです！");
        document.getElementById("win").innerHTML = "先手●の勝ち：" + String(turn+1) + "ターン。スタートを押して下さい";
    }
    else{
        alert("後手▲の勝ちです！");
        document.getElementById("win").innerHTML = "後手▲の勝ち：" + String(turn+1) + "ターン。スタートを押して下さい";;
    }
}

function print(list){
    var str = "";
    for(let i in list){
        str += list[i] + " ";
    }
    return str;
}