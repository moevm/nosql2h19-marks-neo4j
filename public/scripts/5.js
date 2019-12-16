//Переменая для связей Предмет-препод
let lt = new Map();

function getAssessmets(){
	ajaxPost(
		"/getAssessmets",
		{id: $("#id").text()},
		rewriteTable
	);
}
function addAssesement(){
	if ($("#date").val() == ''){
		alert("Введите дату");
		return;
	}
	let date =  $("#date").val().split("-");
	
	ajaxPost(
		"/addAssesement",
		{
			id: $("#id").text(),
			lesson: $("#lesson").val(),
			teacher: $("#teacher").val(),
			date: `${date[2]}.${date[1]}.${date[0]}`,
			assesement: $("#assesement").val()
		},
		()=>{getAssessmets();getLessAndTeach()}
	);
}
function dellAssesment(lesson){

}


function getLessAndTeach(){
	ajaxPost(
		"/getLessAndTeach",
		{id: $("#id").text()},
		(res)=>{createLT_Map(res);rewriteLessonList();}
	);
}

function createLT_Map(strs){
	lt.clear();
	
	for (i in strs){
		str = strs[i];
		
		if (lt.has(str[0])){
			lt.get(str[0]).push([str[1],str[2]]);
		}
		else{
			lt.set(str[0], [[str[1],str[2]]]);
		}
	}
}

function rewriteLessonList(){
	$("#lesson").find('option').remove();
	
	for (let les of lt.keys()){
		$("#lesson").append(`<option value="${les}">${les}</option>`);
	}
	
	rewriteTeacherList();
}
function rewriteTeacherList(){
	$("#teacher").find('option').remove();
	
	for (  let tch of lt.get($('#lesson').val())   ){
		$("#teacher").append(`<option value="${tch[0]}">${tch[1]}</option>`);
	}
}



function rewriteTable(strs){
	$("#ocenki").find('tr').remove();
	
	for (let i in strs){
		str = strs[i];
		$("#ocenki").append(`<tr>\
			<td>${str[0]}</td>\
			<td>${str[1]} ${str[2]}</td>\
			<td>${str[3]}</td>\
			<td>${str[4]}</td>\
			<td>\
				<button onclick="dellAssesment('${str[0]}')">Удалить отметку</button>
			</td>\
		</tr>`);
	}
}