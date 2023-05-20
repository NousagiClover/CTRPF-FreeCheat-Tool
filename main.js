var source = [];
var root = [];
var open = 0;
var sourceArea = document.getElementById('cheat');
var cheatName = document.getElementById('name');
var cheatInfo = document.getElementById('info');
var folderName = document.getElementById('folder');
var baseColor = document.getElementById('base');
var nameColor = document.getElementById('nameColor');
var infoColor = document.getElementById('infoColor');
var folderColor = document.getElementById('folderColor');
var rootDisplay = document.getElementById('root');
var index = document.getElementById('index');


function writeCode(data) {
	// インデックスにコードを追加
	if (index.value == 0) {
		source.splice(source.length, 0, data);
	} else {
		source.splice(index.value - 1, 0, data);
	}
	
	// ソースコードを画面に反映
	sourceArea.value = source.join('');
}

function addcode() {
	var codetmp = document.getElementById('code').value;
	
	// チートコードが空なら0で埋める
	if (codetmp == '') codetmp = '00000000 00000000';
	
	// 名前が空なら初期値を代入
	if (cheatName.value == '') cheatName.value = 'CheatName';
	
	// 名前をフリチ形式に変換する
	if (nameColor.value == '') {
		if (baseColor.value == '') {
			var name = '[' + cheatName.value + ']';
		} else {
			var name = '[~#' + baseColor.value + '~' + cheatName.value + ']';
		}
	} else {
		var name = '[~#' + nameColor.value + '~' + cheatName.value + ']';
	}
	
	// 説明をフリチ形式に変換する
	if (infoColor.value == '') {
		if (baseColor.value == '') {
			var info = '{' + cheatInfo.value + '}';
		} else {
			var info = '{~#' + baseColor.value + '~' + cheatInfo.value + '}';
		}
	} else {
		var info = '{~#' + infoColor.value + '~' + cheatInfo.value + '}';
	}
	
	// データをフリチ形式コード変換
	if (cheatInfo.value == '') {
		var code = '\n' + name + '\n' + codetmp + '\n';
	} else {
		var code = '\n' + name + '\n' + codetmp + '\n' + info + '\n';
	}
	
	// コードをソースコードに追加する
	writeCode(code);
}

function mkFolder() {
	// フォルダ名が空なら初期値を代入
	if (folderName.value == '') folderName.value = 'FolderName';
	
	// フォルダ名をフリチ形式に変換する
	if (folderColor.value == '') {
		if (baseColor.value == '') {
			var folder = '\n[++' + folderName.value + '++]\n';
		} else {
			var folder = '\n[++~' + baseColor.value + '~' + folderName.value + '++]\n';
		}
	} else {
		var folder = '\n[++~' + folderColor.value + '~' + folderName.value + '++]\n';
	}
	
	// フォルダをソースコードに追加する
	writeCode(folder);
	open += 1;
}

function clFolder() {
	// 開いてるフォルダが存在するか確認
	if (open <= 0) return;
	
	writeCode('\n[--]\n');
	open -= 1;
}

function getFolderName(inputString) {
	var inputString = inputString.replace(/\n/g, '');
	var inputString = inputString.replace(/~[^~]+~/g, "");
	var regex = /\[\+\+(.*?)\+\+\]/;
	var match = inputString.match(regex);
	var outputString = match ? match[1] : null;
	return outputString;
}

function del() {
	// ソースコードを全てクリア
	source = [];
	root = [];
	sourceArea.value = '';
	rootDisplay.innerHTML = '';
	open = 0;
}

function line() {
	// インデックス計算
	if (index.value == 0) {
		var idx = source.length - 1;
	} else {
		var idx = index.value - 1;
	}
	
	// フォルダチェック
	if (source[idx].includes('[++')) {
		open -= 1;
	} else if (source[idx].includes('[--]')) {
		open += 1;
	}
	
	// 1ブロックのみ削除
	source.splice(index.value - 1, 1);
	sourceArea.value = source.join('');
}

function cle() {
	var codetmp = document.getElementById('code');
	codetmp.value = '';
	cheatName.value = '';
	cheatInfo.value = '';
	folderName.value = '';
	baseColor.value = '';
	nameColor.value = '';
	infoColor.value = '';
	folderColor.value = '';
}

function download() {
	const cheatData = document.getElementById('cheat').value;
	if (cheatData == "") {
		alert("ソースコードがありません。");
	} else {
		const element = document.createElement('a');
		const file = new Blob([cheatData], {type: 'text/plain'});
		element.href = URL.createObjectURL(file);
		element.download = 'cheat.txt';
		document.body.appendChild(element);
		element.click();
	}
}

function test(event) {
	// 不正入力チェック
	if (index.value > source.length || index.value == '') {
		index.value = 0;
	}
	
	// 不正入力チェックその2
	var input = event.target.value;
	var isValid = /^\d*$/.test(input);
	
	if (!isValid) {
		event.target.value = 0;
	}
}
