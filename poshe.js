let cnt = 0;
const target_id = ["unallocated","am","pm","finished", "tomorrow"];

//現在日時を初期値に設定
window.addEventListener('load', () => {
	const now = new Date();
	now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
	document.getElementById('date').value = now.toISOString().slice(0, -8);
});

function make_savearray(){
	let result = {"unallocated" : [], "am" : [], "pm" : [],
"finished" : [], "tomorrow" : []};
	target_id.forEach(id =>{
		let temp = document.getElementById(id);
		temp.querySelectorAll(".elements").forEach(i =>
		result[id].push(i.textContent));	
	});
	//console.log(result);
	return result;
}

function setCookie(name, json){
	let cookie = '';
	let expire = '';
	let period = '';
	//Cookieの保存名と値を指定
	cookies = name + '=' + JSON.stringify(json) + ';';
	//Cookieを保存するパスを指定
	cookies += 'path=/;';
	//Cookieを保存する期間を指定
	period = 365 * 5; //保存日数 2038年問題に注意
	expire = new Date();
	expire.setTime(expire.getTime() + 1000 * 3600 * 24 * period);
	expire.toUTCString();
	cookies += 'expires=' + expire + ';';
	//Cookieを保存する
	document.cookie = cookies;
};

function save_cookie(save_array){
	const result = make_savearray();
	//console.log(result);
	set_Cookie("schedule",result);
	//console.log(document.cookie);
}

function get_Cookie(){
		let cookies = '';
		let result = {};
		cookies = document.cookie;
		cookie_array = cookies.split(";");
		//Cookieを配列に分割してJSONに変換する
		if(cookies){
			cookie_array.forEach(data => {
				data = data.split('=');
				result[data[0]] = JSON.parse(data[1]);
			});
		}
		//console.log(result["schedule"]);
		return result
}

function set_schedule(cookie_array){
	schedule_array = cookie_array["schedule"];
	target_id.forEach(id => {
		T_array = schedule_array[id].reverse()
		T_array.forEach(text =>{
			make_li(text,id);
		});
	});
	set_dragevent();
}

function get_options(){

}

function save_options(){
	let options_array = get_options()
	setCookie("options",options_array);
}

function set_options(cookie_array){
	options_array = cookie_array["options"];
}

function regit(){
	let result = []
	const tgt = ["date","title","text"]
	tgt.forEach(element => result.push(document.getElementById(element).value));
	//console.log(Date(result[0]));
	result[0] = result[0].replace("2022-","").replace("-","/").replace(/^0+/, '').replace("T","");
	result.join(" ");
	make_li(result,"unallocated");
	set_dragevent();
}

function make_li(result,id_name){
	let li_object = document.createElement("li");
	li_object.id = ++cnt;
	li_object.className = "elements";
	li_object.draggable = true;
	const li_text = document.createTextNode(result);
	let li_checkbox = document.createElement("input");
	li_checkbox.id = "chkbx";
	li_checkbox.type = "checkbox";
	li_object.appendChild(li_checkbox);
	li_object.appendChild(li_text);
	const tgt = document.getElementById(id_name);
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
}

function set2fig(num) {
	// 桁数が1桁だったら先頭に0を加えて2桁に調整する
	let ret;
	if( num < 10 ) { ret = "0" + num; }
	else { ret = num; }
	return ret;
}

let date = "";
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
	let nowTime = new Date();
	let nowHour = set2fig( nowTime.getHours() );
	let nowMin  = set2fig( nowTime.getMinutes() );
	let nowSec  = set2fig( nowTime.getSeconds() );
	let msg = "現在、" + date + nowHour + "時" + nowMin + "分" + "です。";
	document.getElementById("RealtimeClockArea").innerHTML = msg;
	setInterval('showClock()',60 * 1000);
}

function set_dragevent(){
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
	save_cookie();
}

showDate();
set_schedule(get_Cookie());
set_dragevent();