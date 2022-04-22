var cnt = 0;

function make_savearray(){
	const target_id = ["unallocated","am","pm","finished", "tomorrow"]
	var result = {};
	var index = 0;
	const target_data = document.getElementsByClassName("drag-list");
	Array.prototype.forEach.call(target_data,(i,j) => {
		result[i] = [];
		Array.prototype.forEach.call(i.children,k => {
			console.log(k.className);
		});
	});
	console.log(result);
}

function load_cookie(){
	
}

function save_cookie(save_array){
	
}


function regit(){
	var result = []
	const tgt = ["date","input_time","text"]
	tgt.forEach(element => result.push(document.getElementById(element).value));
	result[0] = result[0].replace("2022-","").replace("-","/").replace(/^0+/, '');
	return make_li(result)
}

function make_li(result){
	var li_object = document.createElement("li");
	li_object.id = ++cnt;
	li_object.className = "elements";
	li_object.draggable = true;
	const li_text = document.createTextNode(result.join(" "));
	var li_checkbox = document.createElement("input");
	li_checkbox.id = "chkbx";
	li_checkbox.type = "checkbox";
	li_object.appendChild(li_checkbox);
	li_object.appendChild(li_text);
	const tgt = document.getElementById("unallocated");
	tgt.insertBefore(li_object,tgt.firstChild);
	$('#chkbx').click(function() {
		if(this.checked){
			const tgt = document.getElementById("finished");
			tgt.insertBefore(li_object,tgt.firstChild);
		}
		else{
			const tgt = document.getElementById("unallocated");
			tgt.insertBefore(li_object,tgt.firstChild);
		}

	});
	main();
}

function set2fig(num) {
   // 桁数が1桁だったら先頭に0を加えて2桁に調整する
   var ret;
   if( num < 10 ) { ret = "0" + num; }
   else { ret = num; }
   return ret;
}
var date = "";
function showDate(){
	const nowTime = new Date();
	const nowMonth = nowTime.getMonth() + 1;
	const nowDay = nowTime.getDate();
	const nowYear = nowTime.getFullYear();
	const reiwa = new Intl.DateTimeFormat('ja-JP-u-ca-japanese').format(nowTime);
	const ymd = ["年","月","日"];
	reiwa.replace("R","令和").split("/").forEach((element, index) => {date += element + ymd[index];})
	const dayOfWeek = nowTime.getDay();	// 曜日(数値)
	const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek] ;	// 曜日(日本語表記)
	date += "(" + dayOfWeekStr+ ")"	
	showClock();
}


function showClock() {
	var nowTime = new Date();
   	var nowHour = set2fig( nowTime.getHours() );
	var nowMin  = set2fig( nowTime.getMinutes() );
   	var nowSec  = set2fig( nowTime.getSeconds() );
   	var msg = "現在、" + date + nowHour + "時" + nowMin + "分" + nowSec + "秒です。";
   	document.getElementById("RealtimeClockArea").innerHTML = msg;
   	setInterval('showClock()',1000);
}

function main(){
document.querySelectorAll('.drag-list li').forEach (elm => {
	elm.ondragstart = function () {
		//console.log(elm);
		event.dataTransfer.setData('text/plain',event.target.id);
	};

	elm.ondragover = function () {
		event.preventDefault();
		this.style.borderTop = '2px solid blue';
	};

	elm.ondragleave = function () {
		this.style.borderTop = '';
	};

	elm.ondrop = function () {
		event.preventDefault();
		let id = event.dataTransfer.getData('text/plain');
		let elm_drag = document.getElementById(id);
		//console.log(this.className);
		this.parentNode.insertBefore(elm_drag, this);
		this.style.borderTop = '';
	};

});
}

main();
