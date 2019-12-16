function getNapravleniaByFac(){
		ajaxPost(
		"/getNapravleniaByFac",
		{id: $("#id").text()},
		rewriteTable
	);
}

function addNapravlenie(){
	ajaxPost(
		"/addNapravlenie",
		{napravlenie:$("#napravlenie").val(), id: $("#id").text()},
		getNapravleniaByFac
	);
}

function dellNapravlenie(napr){
	ajaxPost(
		"/dellNapravlenie",
		{napravlenie:napr, id: $("#id").text()},
		getNapravleniaByFac
	);
}

function rewriteTable(strs){
	
	$("#napravlenieTable").find('tr').remove();
	
	for (let i in strs){
		str = strs[i];
		$("#napravlenieTable").append(`<tr>\
			<td><a href="/napravlenie/${str[3]}">${str[1]}</a></td>
			<td>${str[2]==0?  "<button onclick='dellNapravlenie("+str[3]+")'>Убрать</button>"   : "Групп: "+str[2]} \
			</td>
		</tr>`);
	}
}