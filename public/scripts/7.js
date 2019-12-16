function getLessons(){
	ajaxPost(
		"/getLessons",
		{id: $("#id").text()},
		rewriteTable
	);
}

function getAnotherLessons(){
	ajaxPost(
		"/getAnotherLessons",
		{id: $("#id").text()},
		rewriteAddLessonList
	);
}

function addLesson(){
	ajaxPost(
		"/addLessonToTeacher",
		{id: $("#id").text(), lesson: $("#addLessons").val()},
		()=>{getLessons();getAnotherLessons()}
	);
}

function dellLesson(std){
	ajaxPost(
		"/dellLessonToTeacher",
		{id: $("#id").text(), lesson: std},
		()=>{getLessons();getAnotherLessons()}
	);
}


function rewriteTable(strs){
	$("#lessons").find('tr').remove();
	
	for (let i in strs){
		str = strs[i];
		$("#lessons").append(`<tr>\
			<td>${str[0]}</td>\
			<td><button onclick="dellLesson('${str[0]}')"> Освободить </button></td>\
		</tr>`);
	}
}

function rewriteAddLessonList(strs){
	$("#addLessons").find('option').remove();
	
	for (let i in strs){
		str = strs[i]
		$("#addLessons").append(`<option value="${str[0]}">${str[0]}</option>`);
	}
}