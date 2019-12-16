function getLessonsByKaf(){
		ajaxPost(
		"/getLessonsByKaf",
		{id: $("#id").text()},
		rewriteTable
	);
}

function addLesson(){
	ajaxPost(
		"/addLesson",
		{lesson:$("#lesson").val(), id: $("#id").text()},
		getLessonsByKaf
	);
}

function dellLesson(les){
	ajaxPost(
		"/dellLesson",
		{lesson:les, id: $("#id").text()},
		getLessonsByKaf
	);
}

function rewriteTable(strs){
	
	$("#lessonTable").find('tr').remove();
	
	for (let i in strs){
		str = strs[i];
		$("#lessonTable").append(`<tr>\
			<td>${str[0]}</td>
			<td>${str[2]==0?  "<button onclick='dellLesson("+str[1]+")'>Убрать</button>"   : "Связей: "+str[2]} \
			</td>
		</tr>`);
	}
}