//使うグローバル変数
var turn = 0//ターン数　偶奇によって順番を管理する。
var game_table = get_table();//盤面　テーブルの要素をリスト[i][j]に格納した。

function reset(){document.location.reload();}//ページ更新

/*
function start(){
    game_table = get_table();
    turn = 0;
}
*/

function get_table(){//テーブルの状態を取得 1行目はボタンが入っている
    var game_table = [];
    var table = document.getElementById("game");
    for(let row of table.rows){
        var game_col = [];
        for(let cell of row.cells){
            game_col.push(cell.innerText);
        }
        game_table.push(game_col);
    }
    return game_table;
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
            str += '<td><span class = "space">' + game_table[i][j] + '</span></td>';
        }
        str += "</tr>";
    }
    //console.log(str);
    table.innerHTML = str;
}

function play(n){//ボタンを押したとき、コマを配置する。nは行0~6
    switch (n){
        case 0:
            if(set(n)){
                write_table(game_table);
                turn++;
                change_turn();
            }
            else alert("そこには置けません！もう一度置いてください");
            break;
        case 1:
            if(set(n)){
                write_table(game_table);
                turn++;
                change_turn();
            }
            else alert("そこには置けません！もう一度置いてください");
            break;
        case 2:
            if(set(n)){
                write_table(game_table);
                turn++;
                change_turn();
            }
            else alert("そこには置けません！もう一度置いてください");
            break;
        case 3:
            if(set(n)){
                write_table(game_table);
                turn++;
                change_turn();
            }
            else alert("そこには置けません！もう一度置いてください");
            break;
        case 4:
            if(set(n)){
                write_table(game_table);
                turn++;
                change_turn();
            }
            else alert("そこには置けません！もう一度置いてください");
            break;
        case 5:
            if(set(n)){
                write_table(game_table);
                turn++;
                change_turn();
            }
            else alert("そこには置けません！もう一度置いてください");
            break;
        case 6:
            if(set(n)){
                write_table(game_table);
                turn++;
                change_turn();
            }
            else alert("そこには置けません！もう一度置いてください");
            break;
    }
}

function set(n){//n行目のコマがないところにコマを設置 0indexed
    for(var i = 6; i >= 1; i--){
        if(game_table[i][n] == ""){
            if(turn % 2 == 0){
                game_table[i][n] = "o";
            }
            else game_table[i][n] = "x";
            console.log(game_table[i]);
            return true;
        }
    }
    return false;
}

function change_turn(){
    if(turn % 2 == 0){
        document.getElementById("turnA").style.display = "block";
        document.getElementById("turnB").style.display = "none";
    }
    else{
        document.getElementById("turnB").style.display = "block";
        document.getElementById("turnA").style.display = "none";
    }
}