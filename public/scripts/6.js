function getRequest(){
	ajaxPost(
		"/avgAssessmentPerFacultetFromDate",
		{name:$("#Fac").val(), at:$("#at").val(), from:$("#from").val()},
		(req)=>{
			  $("#container").empty();
			  var chart = anychart.column(req);
			  //set chart title
			  chart.title("Средняя оценка по годам на "+$("#Fac").val());
			  //set chart container and draw
			  chart.container("container").draw();
			  //$(".anychart-credits").remove();
		}
	);
}