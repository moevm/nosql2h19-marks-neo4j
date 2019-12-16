//Переменая для связей Предмет-препод
let lt = new Map();
let pr = new Map();

function getLessAndTeach(){
	ajaxPost(
		"/getTeachAndLess",
		{},
		(res)=>{createLT_Map(res);rewriteTeacherList();}
	);
}

function createLT_Map(strs){
	
	lt.clear();
	
	for (i in strs){
		str = strs[i];
		
		if (lt.has(str[1])){
			lt.get(str[1]).push(str[0])
		}
		else{
			lt.set(str[1], [str[0]]);
			pr.set(str[1], [str[2]]);
		}
	}
}

function rewriteTeacherList(){
	$("#teacher").find('option').remove();
	
	for (let tch of pr.keys()){
		$("#teacher").append(`<option value=${tch}>${ pr.get(tch) }</option>`);
	}
	
	rewriteLessonList();
}
function rewriteLessonList(){
	$("#lesson").find('option').remove();
	
	for (  let les of lt.get(Number.parseInt($('#teacher').val()))   ){
		$("#lesson").append(`<option value="${les}">${les}</option>`);
	}
}

function getRequest(){
	ajaxPost(
		"/countAssesementByTeacherOnLesson",
		{teacher: $("#teacher").val(), lesson: $("#lesson").val()},
		(req)=>{
			  $("#container").empty();
			  var chart = anychart.pie(req);
			  //set chart title
			  chart.title("Оцеки, выставляемые преподавателем");
			  //set chart container and draw
			  chart.container("container").draw();
			  //$(".anychart-credits").remove();
		}
	);
}