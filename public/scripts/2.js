$('document').ready(()=>{
	ajaxPost(
		"/getFacultet",
		{},
		(req)=>{
			let filtr = $('#Facultet').find('.filter');
			for(let i in req){
				filtr.append(`<input type="checkbox" checked="checked" value="${req[i]}">${req[i]}<br>`);
			}
		}
	);
	ajaxPost(
		"/getNapravlenie",
		{},
		(req)=>{
			let filtr = $('#Napravlenie').find('.filter');
			for(let i in req){
				filtr.append(`<input type="checkbox" checked="checked" value="${req[i]}">${req[i]}<br>`);
			}
		}
	);
	ajaxPost(
		"/getGroup",
		{},
		(req)=>{
			let filtr = $('#Group').find('.filter');
			for(let i in req){
				filtr.append(`<input type="checkbox" checked="checked" value="${req[i]}">${req[i]}<br>`);
			}
		}
	);
});


//Показывает/прячет фильтр при нажатии на кнопку
function selectFiltr(id){
	let flag = $(`#${id}`).find('.filter').css('display');
	$(`#${id}`).find('.filter').css('display', flag=='none' ? 'block' : 'none')
}


function filtration(){
	let facultet = [];
	$('#Facultet').find('input:checkbox:checked').each(function(){
		facultet.push($(this).val());
	});
	let napravlenie = [];
	$('#Napravlenie').find('input:checkbox:checked').each(function(){
		napravlenie.push($(this).val());
	});
	let group = [];
	$('#Group').find('input:checkbox:checked').each(function(){
		group.push($(this).val());
	});
	
	ajaxPost(
		"/getFilter",
		{facultet:facultet, napravlenie:napravlenie, group:group},
		rewriteTable
	);
}

function startTest(){
		ajaxPost(
			"/test",
			{},
			(req)=>{alert(req);}
		);
}


function toStudent(id){
		ajaxPut(
			"/toStudent",
			{id: id},
			()=>{}
		);
}

function delStudent(id){
		ajaxPost(
			"/delStudent",
			{id: id},
			rewriteTable
		);
}

function addStudent(){
	body = {}
	if ($("#num").val()){body.num = $("#num").val()}
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
		"/addStudent",
		body,
		rewriteTable
	);
}

//Перезапись таблицы со студентами
function rewriteTable(strs){
	$("#students").find('tr').remove();
	
	for (let i in strs){
		str = strs[i];
		$("#students").append(`<tr>\
			<td>${str[0]}</td>\
			<td>${str[1]}</td>\
			<td>${str[2]}</td>\
			<td><a href="/5/${str[5]}">${str[3]} ${str[4]}</td>\
			<td><button class="deletor" onclick="delStudent('${str[5]}')">(╬◣﹏◢)</td>\
		</tr>`);
	}
}