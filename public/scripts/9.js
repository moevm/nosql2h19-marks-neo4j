let flagRequest = false;

function getRequest(){
	$("#Kaf").attr("disabled","");
	ajaxPost(
		"/workLoadOnKafedra",
		{kafedra: $("#Kaf").val()},
		(req)=>{
			  $("#container").empty();
			  var chart = anychart.pie(req);
			  //set chart title
			  chart.title("Оцеки, выставляемые преподавателем");
			  //set chart container and draw
			  chart.container("container").draw();
			  //$(".anychart-credits").remove();
			  $("#Kaf").removeAttr("disabled");
		}
	);
}