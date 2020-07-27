var card = ['ノーマル','炎','水','電気','草','氷','格闘','毒',
'地面','飛行','エスパー','虫','岩','ゴースト','ドラゴン','悪','鋼','フェアリー'];
var list = new Object();
for(var i = 0; i <= 17; i++){
    list[card[i]] = i;
}
//console.log(list);
card = shuffle(card);
var mine = [];
var enemy = [];
var zone = [];
var me_select = [];

set_zone();
set_mine();
set_enemy();
document.getElementById("zone").innerHTML = print(zone);
document.getElementById("mine").innerHTML = print(mine);

function set_zone(){
    for(var i = 0; i <= 3; i++){
        zone.push(card[i]);
    }
}

function set_mine(){
    for(var i = 4;i <= 10; i++){
        mine.push(card[i]);
    }
}

function set_enemy(){
    for(var i = 11; i <= 15; i++){
        enemy.push(card[i]);
    }
}

function shuffle(array){
    for(var i = array.length - 1; i > 0; i--){
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
    return array;
}

function print(list){
    var str = "";
    for(let i in list){
        str += list[i] + " ";
    }
    console.log(str);
    return str;
}

function get_select(){
    var tmp = [];
    document.getElementById("");
}

function battle(){
    document.getElementById("enemy").innerHTML = print(enemy);

}

function score_calc(mine,enemy);