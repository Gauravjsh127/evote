function createXHR() {
	if (typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	} else {
		try {
			return new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e1) {
			try {
				return new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e2) {
			}
		}
	}
	return null;
}


function sendRequest(operation) {
	var key = document.getElementById('key').value;
	var Db_name = document.getElementById('Db_name').value;
	var value = document.getElementById('value').value;
	if(Db_name === ''){
		document.getElementById('echo').innerHTML = 'Please input a Db_name.';
		document.getElementById('key').focus();
		return;
	}
	if(key === ''){
		document.getElementById('echo').innerHTML = 'Please input a key.';
		document.getElementById('key').focus();
		return;
	}

	
	
	var value = document.getElementById('value').value;
	document.getElementById('echo').innerHTML = '';

	var xhr = createXHR();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			var result = JSON.parse(xhr.responseText);
			var value = result.value;
			if (operation == "get") {
				if (value === undefined) {
					document.getElementById('echo').innerHTML = "The key " + key + " was not found.";
					document.getElementById('key').value = "";
					document.getElementById('value').value = "";
				} else {
					document.getElementById('value').value = value;
					document.getElementById('echo').innerHTML = "The get was successful for the key " + key + ".";
				}
			} else {
				if (operation == "delete") {
					document.getElementById('key').value = "";
					document.getElementById('value').value = "";
				}
				document.getElementById('echo').innerHTML = value;
			}
		}
	};

	if (operation == "get") {
		xhr.open("GET", "cache/" + key, true);
		xhr.send(null);
	} else if (operation == "put") {
		xhr.open("PUT", "cache?key=" + key + "&value=" + value, true);
		xhr.send(null);
	} else {
		xhr.open("DELETE", "cache/" + key, true);
		xhr.send(null);
	}
}


var REST_DATA_CREATEDB = '/GIT_Wealthmanagement/CREATEDB';
function createDB() {
	var DBname = document.getElementById('Db_name').value;

	var data="?DB="+DBname;
	xhrPost(REST_DATA_CREATEDB + data, function(){
	}, function(err){
		alert(err);
	});
	document.getElementById('DbCreatedInfo').innerHTML = 'DB Created Name : '+DBname;
}



var REST_DATA_POST = '/GIT_Wealthmanagement/POST';
function PostData() {

	var docid = document.getElementById('docid').value;
	var key = document.getElementById('key').value;
	var value = document.getElementById('value').value;

	var data1="?docid="+docid;
	var data2="&key="+key;
	var data3="&value="+value;

	var data=data1+data2+data3;

	xhrPost(REST_DATA_POST + data, function(){
	}, function(err){
		alert(err);
	});
	document.getElementById('DataInsertInfo').innerHTML = 'Doc ID INSERTED : '+docid;
}

var REST_DATA_PUT = '/GIT_Wealthmanagement/PUT';
function PutData() {

	var docid = document.getElementById('docid').value;
	var key = document.getElementById('key').value;
	var value = document.getElementById('value').value;

	var data1="?docid="+docid;
	var data2="&key="+key;
	var data3="&value="+value;

	var data=data1+data2+data3;

	xhrPut(REST_DATA_PUT + data, function(){
	}, function(err){
		alert(err);
	});
	document.getElementById('DataInsertInfo').innerHTML = 'Doc ID INSERTED : '+docid;
}

var REST_DATA_DELETE = '/GIT_Wealthmanagement/DELETE';
function deleteData() {

	var docid = document.getElementById('docid').value;

	var data1="?docid="+docid;

	var data=data1;

	xhrDelete(REST_DATA_DELETE + data, function(){
	}, function(err){
		alert(err);
	});
}


var REST_DATA_GET = '/GIT_Wealthmanagement/GET';
function getData() {

	var docid = document.getElementById('docid').value;

	var data1="?docid="+docid;

	xhrGet(REST_DATA_GET+ data1, function(data){


		document.getElementById("DataFetchInfo").innerHTML='Doc Fetched : '+data;

	}, function(err){

		alert(err);
	});

}





