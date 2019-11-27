function getAssessmets(){
	ajaxPost(
		"/getAssessmets",
		{id: $("#id").text()},
		rewriteTable
	);
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
		</tr>`);
	}
}