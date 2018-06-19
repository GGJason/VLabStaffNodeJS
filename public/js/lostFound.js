// global vars
var form_id, form_time, form_username;


// load gallery photos
//$.get('',function(responseJSON){
	responseJSON = {
		"lost":[
			{"id":1, "name":"水壺", "time":"Wed Jun 06 2018 14:50:01 GMT+0800 (CST)","user":"邱文心","description":"描述001", "file":"./images/lostFound/001.png", "archieved":false},
			{"id":2, "name":"qwe", "time":"Wed Jun 06 2018 14:50:01 GMT+0800 (CST)","user":"邱文心","description":"描述002", "file":"./images/lostFound/002.png", "archieved":false},
			{"id":3, "name":"123", "time":"Wed Jun 06 2018 14:50:01 GMT+0800 (CST)","user":"邱文心","description":"描述003", "file":"./images/lostFound/003.png", "archieved":false},
			{"id":4, "name":"???", "time":"Wed Jun 06 2018 14:50:01 GMT+0800 (CST)","user":"邱文心","description":"描述004", "file":"./images/lostFound/004.png", "archieved":false},
			{"id":5, "name":"筆", "time":"Wed Jun 06 2018 14:50:01 GMT+0800 (CST)","user":"邱文心","description":"描述005", "file":"./images/lostFound/005.png", "archieved":false}

		]
	}
	responseArr = responseJSON.lost
	for( var i in responseArr ){
		var id = responseArr[i].id
		var file = responseArr[i].file
		var name = responseArr[i].name
		var time = new Date(responseArr[i].time)
		time = time.toLocaleString("roc",{ timezone: 'Asia/Taipei'})
		var user = responseArr[i].user
		var description = responseArr[i].description
		if(!responseArr[i].archieved){
			var html = '<div class="photo" id="'+id+'"><img src="'+file+'">'
			+'<div class="photoHover" >' + id + '<br>' + name + '<br>拾獲時間：' + time + '<br>拾獲者：' + user + '<br>' + description
			+'<br><input class="archive" type="button" onclick="archive('+id+')" value="已領回"></input></div>'
			+'</img></div>'
			$('#gallery').append(html)
			$('.photoHover').hide()
		}
	}
	$('.photo').hover(function () {
		$(this).children().show()
	}, function(){
		$('.photoHover').hide()
	})
//})


function archive(id){
	var confirmMsg = '把id：' + id + '的東西物歸原主囉？'
	var postJSON = {id:0
		, archieved:true}
	postJSON.id = id
	if (confirm(confirmMsg)){
		console.log(postJSON)
		$.post('',postJSON,function(receiveJSON){
			if (receiveJSON.status != 'ok'){
				alert('送出的東西好像有哪裡錯了>A<\n' + JSON.stringify(receiveJSON))
			}else{
				alert('已封存！')
			}
		})
		.done(function(){
			refreshGallery()
		})
	}
}


// inputLostForm
$('#inputLostForm').hide()
function inputLost(){
	$('#inputLostForm').show()
	$.get('auth.php?info',function(responseText){
		responseJSON = JSON.parse(responseText)
		form_id = Math.floor(Math.random() * 100) + 1
		form_time = new Date() 
		form_username = responseJSON.username
		$('#foundId').text(form_id)
		$('#foundTime').text(form_time.toLocaleString("roc",{ timezone: 'Asia/Taipei'}))
		$('#foundUser').text(responseJSON.name)
	})


}

// submit lost form
function submit(){
	var postJSON = {id:"", name:"", time:"",user:"",discription:"", file:"" }
	postJSON.id = $('#foundId').text()
	postJSON.name = $('input[name$="foundName-input"]').val()
	postJSON.time = form_time
	postJSON.user = form_username
	postJSON.discription = $('textarea[name$="foundDiscription-input"]').val()
	postJSON.file = document.getElementById('foundFile').files[0]
	
	console.log(postJSON)
	var alertMessage = ""
	var showAlert = false;
	if( $('#foundFile').val() == "" ){
		alertMessage += '沒有上傳照片喔！\n'
		showAlert = true
	}
	if( postJSON.name=="" ){
		alertMessage += '沒有填寫失物名稱喔！\n'
		showAlert = true
	}
	if( showAlert ){
		alert( alertMessage )
	}else{

		$.post('',postJSON, function(receiveJSON){
			if (receiveJSON.status != 'ok'){
				alert('送出的東西好像有哪裡錯了>A<\n' + JSON.stringify(receiveJSON))
			}else{
				alert('已送出！')
			}
		})
		.done(function(){
			refreshGallery()
		})
	}
}




