var qq;
function test(){
	$("#retTXT").text("");
	$.ajax('/test', {
		type: "PUT",
		data: {req:$("#txt").val()},
		success: (ret)=>{
			for (r in ret.records){
				records = ret.records[r]._fields[0].labels;
				t = $("#retTXT").text() + '{'+records+ '}';
				
				
				$("#retTXT").text(t);
			}
		}
	});
}
