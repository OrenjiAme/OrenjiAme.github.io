var cnt = 0;
const target_id = ["unallocated","am","pm","finished", "tomorrow"];

//現在日時を初期値に設定
window.addEventListener('load', () => {
	const now = new Date();
	now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
	document.getElementById('date').value = now.toISOString().slice(0, -8);
});

function make_savearray(){
	var result = {"unallocated" : [], "am" : [], "pm" : [],
"finished" : [], "tomorrow" : []};
	target_id.forEach(id =>{
		var temp = document.getElementById(id);
		temp.querySelectorAll(".elements").forEach(i =>
		result[id].push(i.textContent));	
	});
	//console.log(result);
	return result;
}

function save_cookie(save_array){
	const result = make_savearray();
	console.log(result);
	const setCookie = (name, json)=>{
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
	setCookie("schejule",result);
	console.log(document.cookie);
}

function getCookie(){
		let cookies = '';
		let cookieArray = new Array();
		let result = new Array();
		//Cookieを取得する
		cookies = document.cookie;
		//Cookieを配列に分割してJSONに変換する
		if(cookies){
			cookieArray = cookies.split(';');
			cookieArray.forEach(data => {
				data = data.split('=');
				//data[0]: Cookieの名前（例では「user」）
				//data[1]: Cookieの値（例では「json」）
				result[data[0]] = JSON.parse(data[1]);
			});
		}
		return result;
		//console.log(getCookie());
}
	


function setschejule(cookie_array){
	target_id.forEach(id => {
		/*
		cookie_array[id].forEach(i =>{
			document.getElementById(id).insertBefore(i,0);
		});
		*/
		console.log(cookie_array[id]);
	});
}

function regit(){
	var result = []
	const tgt = ["date","title","text"]
	tgt.forEach(element => result.push(document.getElementById(element).value));
	//console.log(Date(result[0]));
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
	var msg = "現在、" + date + nowHour + "時" + nowMin + "分" + "です。";
	document.getElementById("RealtimeClockArea").innerHTML = msg;
	setInterval('showClock()',60 * 1000);
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

showDate();
console.log(document.cookie);
setschejule(getCookie());
main();