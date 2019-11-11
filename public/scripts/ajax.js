// Базовый интерфейс для всех запросов
function ajax(type="GET", name="/", body={}, func=()=>{}){
	$.ajax(name, {
		type: type,
		data: body,
		success: (req)=>{
			func(req);
		}
	});
}

//Набор шаблонов для всех стандартных типов запросов серверу
let ajaxPut     = (name, body={}, func=()=>{})=>{ajax("PUT"   , name, body, func)};
let ajaxGet     = (name, body={}, func=()=>{})=>{ajax("GET"   , name, body, func)};
let ajaxPost    = (name, body={}, func=()=>{})=>{ajax("POST"  , name, body, func)};
let ajaxDelete  = (name, body={}, func=()=>{})=>{ajax("DELETE", name, body, func)};



//Функция для разбора ответа (поле "запись" neo4j-серера
// на вход - ответ от neo4j
// на выход - json типа:
// {
// 		fields: [field1, field2,...],
//      stats:  [[a11,a12,..],[a21,a22,...],...] 
// }
function responseRecordsParser(records){
	let ret = {
		fields: records[0].keys,
		stats: []
	};
	for (rec in records)
		ret.stats.push(records[rec]._fields);
	
	
	return ret;
}
function createTable(data){
	let table = "<table border=1><tr>";	
	for (i in data.fields){
		table += `<th>${data.fields[i]}</th>`;
	}
	table += "</tr>";
	
	for (i in data.stats){
		st = data.stats[i];
		table += "<tr>"
		for (j in st)
			table += `<td>${st[j]}</td>`;
		
		table += "/<tr>"
	}
	
	return table + "</table>";
}

//Базовая функция для вывода на экран ответа сервера
// на вход - запись, id div-а, куда запихнём таблицу-ответ
function basicHandler(records, id = "retTable"){
	if (records.length==0)
		return;
	
	
	
	
	$(`#${id}`).html(createTable(responseRecordsParser(records)));
}