function getGroupByNapr(){
		ajaxPost(
		"/getGroupByNapr",
		{id: $("#id").text()},
		rewriteTable
	);
}


function addGroup(){
	ajaxPost(
		"/addGroup2",
		{group:$("#group").val(), id: $("#id").text()},
		rewriteTable
	);
}
function dellGroup(gr){
	ajaxPost(
		"/dellGroup",
		{group:gr, id: $("#id").text()},
		rewriteTable
	);
}


function rewriteTable(strs){
	
	$("#groupTable").find('tr').remove();
	
	for (let i in strs){
		str = strs[i];
		$("#groupTable").append(`<tr>\
			<td>${str[0]}</td>
			<td>${str[2]==0?  "<button onclick='dellGroup("+str[1]+")'>Убрать</button>"   : "Студентов: "+str[2]} \
			</td>
		</tr>`);
	}
}