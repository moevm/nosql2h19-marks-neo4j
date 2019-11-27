// function startTest(){
		// ajaxPost(
			// "/avgAssessmentPerFacultetFromDate",
			// {name:"ФКТИ", at:2010, from:2030},
			// (req)=>{
				  // var chart = anychart.column(req);
			//	  set chart title
				  // chart.title("AnyChart Basic Sample");
		//		  set chart container and draw
				  // chart.container("container").draw();
	//			  $(".anychart-credits").remove();
			// }
		// );
// }

function startTest(){
	
	console.log($("#setFacultet").val());
	
}



function test1(id){
	let flag = $(`#${id}`).find('.filter').css('display');
	$(`#${id}`).find('.filter').css('display', flag=='none' ? 'block' : 'none')
	
}