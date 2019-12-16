function getKafedras(){
	ajaxPost(
		"/getKafedras",
		{},
		(req)=>{rewriteKafList(req)}
	);
}


function delTeacher(id){
		ajaxPost(
			"/delTeacher",
			{id: id},
			rewriteTable
		);
}

function addTeacher(){
	body = {}
	if ($("#kaf").val()){body.name = $("#kaf").val()}
	else {alert("Введи все поля");return;}
	
	if ($("#Firstname").val()){body.Firstname = $("#Firstname").val()}
	else {alert("Введи все поля");return;}
	
	if ($("#Lastname").val()){body.Lastname = $("#Lastname").val()}
	else {alert("Введи все поля");return;}
	
	if ($("#telephone").val()){body.telephone = $("#telephone").val()}
	else {alert("Введи все поля");return;}
	
	if ($("#Sity").val()){body.Sity = $("#Sity").val()}
	else {alert("Введи все поля");return;}
	
	ajaxPost(
		"/addTeacher",
		body,
		rewriteTable
	);
}

//Перезапись таблицы со студентами
function rewriteTable(strs){
	$("#teachers").find('tr').remove();
	
	for (let i in strs){
		str = strs[i];
		$("#teachers").append(`<tr>\
			<td>${str[0]}</td>\
			<td><a href="/7/${str[3]}">${str[1]} ${str[2]}</a></td>\
			<td><button class="deletor" onclick="delTeacher('${str[3]}')">(╬◣﹏◢)</td>\
		</tr>`);
	}
}

//Записать кафедры на выбор(для добавления преподов)
function rewriteKafList(strs){
	$("#kaf").find('option').remove();
	
	for (let i in strs){
		str = strs[i];
		$("#kaf").append(`<option value="${str[0]}">${str[0]}</option>`);
	}
}
